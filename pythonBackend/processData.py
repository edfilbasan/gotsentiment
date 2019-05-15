#external modules/libraries
import csv
import tweepy
import threading
import charSets
import queue
import os
import datetime
from timeit import default_timer as timer
import time
import math

#import modules from local files
from TwitterClient import TwitterClient
from FileWatcher import FileWatcher
from MyStreamListener import MyStreamListener
from TweetAnalyzer import TweetAnalyzer
from GotCharacter import GotCharacter
import charSets

#firebase stuff
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
# Fetch the service account key JSON file
cred = credentials.Certificate('gotsentiment3-service-file.json')

# Initialize the app with admin privileges
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gotsentiment3.firebaseio.com'
})

#backup firebase info
# cred = credentials.Certificate('gotbackup-service-file.json')

# default_app = firebase_admin.initialize_app(cred, {
# 	'databaseURL': 'https://gotbackup-985b7.firebaseio.com'
# })

#passes lines from the file {filename} to the tweet analyzer ta,
#writing the result of sentiment analysis at the end of the line
def processLine(que, filename, ta):
	arr = filename.split('.')
	newName = arr[0]+'Processed.'+arr[1]
	with open(filename, newline='') as inf, open(newName, 'w', newline='') as outf:
		csv_reader = csv.reader(inf)
		csv_writer = csv.writer(outf)
		numtweet = 0
		for row in csv_reader:
			if(len(row)>=1):
				tweet = row[0]
				scores = ta.getPolarityScores(tweet)
				csv_writer.writerow(row+scores)
				numtweet=numtweet+1
				print(numtweet)
			else:
				break

#passes lines from the file {filename} to the tweet analyzer ta,
#for sentiment analysis at the rate of the tweets' timestamps 
def timedProcessLine(que, filename):
	arr = filename.split('.')
	newName = arr[0]+'Processed.'+arr[1]
	with open(filename, newline='') as inf, open(newName, 'w', newline='') as outf:
		csv_reader = csv.reader(inf)
		csv_writer = csv.writer(outf)
		# time: runtime 1:30
		row1 = next(csv_reader)
		startDataMinutes = stampToMinutes(row1[3])
		# print(startDataMinutes)
		startCurrentMinutes = getCurrentMinutes()
		# print(startCurrentMinutes)
		start = timer()
		numtweet = 0
		for row in csv_reader:
			if(len(row)>=1):

				tweet = row[0]
				print('Timestamp:' + row[3])
				dataDiff = str(stampToMinutes(row[3])- startDataMinutes)
				print('Diff from data start: ' + dataDiff)
				current = timer()
				timeDiff = str(math.floor((current - start)/60))
				print('Diff from time start: ' + timeDiff)
				while timeDiff<dataDiff:
					current = timer()
					timeDiff = str(math.floor((current - start)/60))
					print('Diff from time start: ' + timeDiff)
				time.sleep(0.01)
				que.put(tweet)
				numtweet=numtweet+1
				# print(numtweet)
			else:
				break

#turn data timestamp into total minutes
def stampToMinutes(stamp):
	dateArr = stamp.split()
	timeArr = dateArr[1].split(':')
	hour = int(timeArr[0],base=10)*60
	dataMinutes = int(timeArr[1],base=10)+hour
	return dataMinutes

def getCurrentMinutes():
	currentHour = int(datetime.datetime.now().strftime("%H"),base=10)*60
	currentMinutes = int(datetime.datetime.now().strftime("%M"),base=10)+currentHour
	return currentMinutes
# Get an item from the queue, pass to the tweet analyzer, and finally notify when complete
def analyzeFromQueue(i, que, ta):
	while True:
		# print("%s: looking for next item" % i)
		tweet = que.get()
		ta.analyze(tweet)
		que.task_done()

numThrones = 0
numGet = 0
def analyzeFromCharQue(i, ta, char):
	while True:
		# print("%s: looking for next Thrones tweet" % i)
		que = char.getQueue()
		tweet = que.get()
		# print("%s: got next Thrones tweet" % i)
		# print("the tweet: " + tweet)
		global numGet
		numGet = numGet+1
		print("num get from que: " + str(numGet))
		char.updateCharacter(char.get_tweet_sentiment(tweet))
		global numThrones
		numThrones = numThrones+1
		print("num analyzed from char que: " + str(numThrones))
		que.task_done()


def printIt(charList):
	threading.Timer(30.0, printIt, [charList]).start()
	for char in charList:
		char.netDecay()

if __name__ == "__main__":
	# file to save and read from
	fileName = "#testThread10.csv"

	#baseline character firebase DB reference
	charRef = db.reference('characters')
	# Create character objects referencing character sentiments to be tracked
	cerseiChar = GotCharacter(charRef.child("cersei"), "Cersei", charSets.cerseiSet)
	danyChar = GotCharacter(charRef.child("daenerys"), "Dany", charSets.danySet)
	jonChar = GotCharacter(charRef.child("jon"), "Jon", charSets.jonSet | {'jon'})
	aryaChar = GotCharacter(charRef.child("arya"), "Arya", charSets.aryaSet)
	sansaChar = GotCharacter(charRef.child("sansa"), "Sansa", charSets.sansaSet)
	branChar = GotCharacter(charRef.child("bran"), "Bran", charSets.branSet)
	tyrionChar = GotCharacter(charRef.child("tyrion"), "Tyrion", charSets.tyrionSet)
	jaimeChar = GotCharacter(charRef.child("jaime"), "Jaime", charSets.jaimeSet)
	brienneChar = GotCharacter(charRef.child("brienne"), "Brienne", charSets.brienneSet)
	gendryChar = GotCharacter(charRef.child("gendry"), "Gendry", charSets.gendrySet)
	tormundChar = GotCharacter(charRef.child("tormund"), "Tormund", charSets.tormundSet)
	theonChar = GotCharacter(charRef.child("theon"), "Theon", charSets.theonSet)
	greyWormChar = GotCharacter(charRef.child("greyworm"), "Grey Worm", charSets.greywormSet)
	houndChar = GotCharacter(charRef.child("thehound"), "The Hound", charSets.houndSet)
	jorahChar = GotCharacter(charRef.child("jorah"), "Jorah", charSets.jorahSet)
	davosChar = GotCharacter(charRef.child("davos"), "Davos", charSets.davosSet)
	podrickChar = GotCharacter(charRef.child("podrick"), "Podrick", charSets.podrickSet)
	melisandreChar = GotCharacter(charRef.child("melisandre"), "Melisandre", charSets.melisandreSet)
	bronnChar = GotCharacter(charRef.child("bronn"), "Bronn", charSets.bronnSet)
	thronesChar = GotCharacter(charRef.child("thrones"), "Game of Thrones", charSets.thronesSet)
	euronChar = GotCharacter(charRef.child("euron"), "Euron", charSets.euronSet)
	# donaldChar = GotCharacter(charRef.child("donald"), "Donald", charSets.donaldSet)

	# List of all characters to be tracked
	charList = [cerseiChar, danyChar, jonChar, aryaChar, sansaChar, branChar, tyrionChar,
	jaimeChar, brienneChar, gendryChar, tormundChar, theonChar, greyWormChar, houndChar, 
	jorahChar, davosChar, podrickChar, melisandreChar, bronnChar, thronesChar, euronChar]

	# init queue for tweets to be processed
	tweetQueue = queue.Queue()
	# init tweet analyzer
	ta = TweetAnalyzer(charList)

	# init workers that will analyze tweets found in the queue
	# NEW -> init workers that will put tweets into char queues
	for i in range(1):
		worker = threading.Thread(target=analyzeFromQueue, args=(i,tweetQueue,ta))
		worker.start()

	for i in range(50):
		throneWorker = threading.Thread(target=analyzeFromQueue, args=(i, tweetQueue, ta))
		throneWorker.start()

	#init workers that will analyze tweets in the thrones Queue
	# for i in range(50):
	# 	throneWorker = threading.Thread(target=analyzeFromCharQue, args=(i, ta, thronesChar))
	# 	throneWorker.start()

	# Start populating the root queue with tweets from the csv file
	populateThread = threading.Thread(target=timedProcessLine, args=(tweetQueue, fileName), kwargs={})
	if(not populateThread.is_alive()):
		populateThread.start()
