#external modules/libraries
import csv
import tweepy
import threading
import charSets
import queue
import os

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
cred = credentials.Certificate('gotsentiment-service-file.json')
# Initialize the app with admin privileges
defualt_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gotsentiment.firebaseio.com'
})

# Begins streaming/saving tweets through the StreamListener object
def initTweetStreaming():
		# creating object of TwitterClient Class
		api = TwitterClient()
		myStreamListener = MyStreamListener()
		try:
			myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
			myStream.filter(track=charSets.filterSet, stall_warnings=True, is_async=True)
		# various exception handling blocks
		except KeyboardInterrupt:
			sys.exit()
		except AttributeError as e:
			print('AttributeError')
			pass
		except tweepy.TweepError as e:
			print('Exception')
			print(e)
			if '401' in e:    
				print('401 exception response')
				print(e)
				sleep(60)
				pass
			else:
				#raise an exception if another status code was returned, we don't like other kinds
				raise e
		except Exception as e:
			print('Unhandled exception')
			raise e


# Open the given file and add lines to the given queue
def initiator(que, fileName):
	csv_reader = csv.reader(FileWatcher(open(fileName)))
	for row in csv_reader:
		# print(row)
		if(len(row)>=1):
			tweet = row[0]
			que.put(tweet)
	

# Get an item from the queue, pass to the tweet analyzer, and finally notify when complete
def analyzeFromQueue(i, que, ta):
	while True:
		# print("%s: looking for next item" % i)
		tweet = que.get()
		ta.analyze(tweet)
		que.task_done()

def printIt(charList):
	threading.Timer(30.0, printIt, [charList]).start()
	for char in charList:
		char.netDecay()

if __name__ == "__main__":
	# file to save and read from
	fileName = "#testThread5.csv"

	if not os.path.exists(fileName):
		open(fileName, 'w').close()

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
	# donaldChar = GotCharacter(charRef.child("donald"), "Donald", charSets.donaldSet)

	# List of all characters to be tracked
	charList = [cerseiChar, danyChar, jonChar, aryaChar, sansaChar, branChar, tyrionChar,
	jaimeChar, brienneChar, gendryChar, tormundChar, theonChar, greyWormChar, houndChar, 
	jorahChar, davosChar, podrickChar, melisandreChar, bronnChar, thronesChar]

	#init thread to stream tweets and write to file
	streamThread = threading.Thread(target=initTweetStreaming, args=(), kwargs={})
	if(not streamThread.is_alive()):
			streamThread.start()

	# init queue for tweets to be processed
	tweetQueue = queue.Queue()
	# init tweet analyzer
	ta = TweetAnalyzer(charList)

	# init workers that will analyze tweets found in the queue
	for i in range(30):
		worker = threading.Thread(target=analyzeFromQueue, args=(i,tweetQueue,ta))
		worker.start()
	# Start populating the queue with tweets from the csv file
	populateThread = threading.Thread(target=initiator, args=(tweetQueue, fileName), kwargs={})
	if(not populateThread.is_alive()):
		populateThread.start()

	print('yoyoyo')