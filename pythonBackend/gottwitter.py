#external modules/libraries
import csv
import tweepy
import threading
import charSets
import queue

#import modules from local files
from TwitterClient import TwitterClient
from FileWatcher import FileWatcher
from MyStreamListener import MyStreamListener
from TweetAnalyzer import TweetAnalyzer


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
		print(row)
		if(len(row)>=1):
			tweet = row[0]
			que.put(tweet)
	

# Get an item from the queue, pass to the tweet analyzer, and finally notify when complete
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
	# file to save and read from
	fileName = "#testThread4.csv"

	# init workers that will analyze tweets found in the queue
	for i in range(30):
		worker = threading.Thread(target=analyzeFromQueue, args=(i,q,ta))
		worker.start()
	# Start populating the queue with tweets from the csv file
	initiator(q, fileName)
	q.join()
	print('done')
		# thr.join()
		# calling main function