import re
import csv
import tweepy
import math
import time
from time import sleep
import threading
import firebase_admin
import charSets
from random import randint

import queue

from TwitterClient import TwitterClient
import json

from TweetAnalyzer import TweetAnalyzer

from multiprocessing.pool import ThreadPool as Pool

#override tweepy.StreamListener to add logic to on_status

class MyStreamListener(tweepy.StreamListener):

		tweet = {}
		idSelf = 0
		# Receives tweets, operates on them (more operations to come?)
		def on_status(self, status):
			try:
				#begin threading change
				if (hasattr(status,'extended_tweet')):
					tweetText = self.clean_tweet(status.extended_tweet['full_text'])
				else:
					tweetText = self.clean_tweet(status.text)
				created_at = status.created_at
				id = status.id
				if(re.search('[a-zA-Z]', tweetText)):
					print('NUM stream tweets: ' + str(self.idSelf))
					print("\n")
					self.idSelf += 1
					self.tweet["tweet"] = tweetText
					self.tweet["id"] = id
					self.tweet["sequence"] = self.idSelf
					self.tweet["created_at"] = created_at
					with open('#testThread4.csv', 'a', newline='') as csv_file:
						writer = csv.DictWriter(csv_file, self.tweet.keys())
						writer.writerow(self.tweet)
			except Exception as e:
				print(">>>>Encountered Exception Tweet: %s" % str(e))
				pass
			return True

		def on_disconnect(self, notice): 
			"""Called when twitter sends a disconnect notice Disconnect 
			codes are listed here: https://dev.twitter.com/docs/streaming-
			apis/messages#Disconnect_messages_disconnect """ 
			print(notice)
			print('DISCONNECTED')
			return 


		def on_stall_warning(self, status):
			print("stall warning")
			print(status)
			return True

		def on_error(self, status_code):
			print("Encountered error with status code:" + repr(status_code))
			return True

		def clean_tweet(self, tweet):
			''' 
			Utility function to clean tweet text by removing links, special characters 
			using simple regex statements. 
			'''
			return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())


def makeData():
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
			print('AttributeError was returned, stupid bug')
			pass
		except tweepy.TweepError as e:
			print('Below is the printed exception')
			print(e)
			if '401' in e:    
				# not sure if this will even work
				print('Below is the response that came in')
				print(e)
				sleep(60)
				pass
			else:
				#raise an exception if another status code was returned, we don't like other kinds
				raise e
		except Exception as e:
			print('Unhandled exception')
			raise e

class FileWatcher(object):
	def __init__(self, file, delay=0.5):
		self.file = file
		self.delay = delay

	def __iter__(self):
		while True:
			where = self.file.tell()
			line = self.file.readline()
			if line and line.endswith('\n'): ## only emit full lines
				yield line
		else:
			print("Waiting for new line")
			time.sleep(self.delay)
			self.file.seek(where)


def initiator(que):
	# csv_reader = csv.reader(FileWatcher(open('#testTweets.csv')))
	csv_reader = csv.reader(FileWatcher(open('#testThread4.csv')))
	for row in csv_reader:
		print(row)
		if(len(row)>=1):
			tweet = row[0]
			que.put(tweet)
	

def analyzeFromQueue(i, que, ta):
	while True:
		print("%s: looking for next item" % i)
		tweet = que.get()
		ta.analyze(tweet)
		que.task_done()

if __name__ == "__main__":

	#init thread to stream tweet and write to file
	thr = threading.Thread(target=makeData, args=(), kwargs={})
	if(not thr.is_alive()):
			thr.start()

	# init queue for tweets to be processed
	q = queue.Queue()
	# init tweet analyzer
	ta = TweetAnalyzer()

	# init workers that will analyze tweets found in the queue
	for i in range(30):
		worker = threading.Thread(target=analyzeFromQueue, args=(i,q,ta))
		worker.start()
	# Start populating the queue with tweets from the csv file
	initiator(q)
	q.join()
	print('done')
		# thr.join()
		# calling main function