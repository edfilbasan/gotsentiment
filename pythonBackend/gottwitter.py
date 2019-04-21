import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob
import math
import time
import threading
import firebase_admin

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import twitter_config
from GotCharacter import GotCharacter
import charSets

# Fetch the service account key JSON file contents
cred = credentials.Certificate('gotsentiment-service-file.json')

# Initialize the app with a service account, granting admin privileges
defualt_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gotsentiment.firebaseio.com'
})

charRef = db.reference('characters')

cerseiChar = GotCharacter(charRef.child("cersei"), "Cersei", charSets.cerseiSet)
danyChar = GotCharacter(charRef.child("daenerys"), "Dany", charSets.danySet)
jonChar = GotCharacter(charRef.child("jon"), "Jon", charSets.jonSet)
aryaChar = GotCharacter(charRef.child("arya"), "Arya", charSets.aryaSet)
sansaChar = GotCharacter(charRef.child("sansa"), "Sansa", charSets.sansaSet)
branChar = GotCharacter(charRef.child("bran"), "Bran", charSets.branSet)
tyrionChar = GotCharacter(charRef.child("tyrion"), "Tyrion", charSets.tyrionSet)
jaimeChar = GotCharacter(charRef.child("jaime"), "Jaime", charSets.jaimeSet)
donaldChar = GotCharacter(charRef.child("donald"), "Donald", charSets.donaldSet)

charList = [cerseiChar, danyChar, jonChar, aryaChar, sansaChar, branChar, tyrionChar, jaimeChar, donaldChar]
#override tweepy.StreamListener to add logic to on_status


class MyStreamListener(tweepy.StreamListener):

		# Receives tweets, operates on them (more operations to come?)
		def on_status(self, status):
			tweetTime = math.floor(time.time())
			newtuple = (status.text, tweetTime)
			words = status.text.split()
			lowerWords = [x.lower() for x in words]
			print(lowerWords)
			wordSet = set(lowerWords)
			# with open("tweetTest.txt", "w") as file:
			# 	file.write(self.clean_tweet(status.text))
			# 	file.write("\n")

			for char in charList:
				if(not wordSet.isdisjoint(char.keywords)):
					self.updateCharacter(char, self.get_tweet_sentiment(status.text))

		def updateCharacter(self, char, sentiment):
			if(sentiment== 'positive'):
				char.onPositive()
			elif(sentiment == 'negative'):
				char.onNegative()
			else:
				char.onNeutral()
			char.printStatus()

		def process_tweets(self, fetched_tweets):
			tweets = []

			try:
					# call twitter api to fetch tweets
					# fetched_tweets = self.api.search(q = query, count = count)

					# parsing tweets one by one
					for tweet in fetched_tweets:
							# empty dictionary to store required params of a tweet
							parsed_tweet = {}

							# saving text of tweet
							parsed_tweet['text'] = tweet[0]
							# saving sentiment of tweet
							parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet[0])

							# appending parsed tweet to tweets list 
							# if tweet.retweet_count > 0:
							# 		# if tweet has retweets, ensure that it is appended only once --> NAH, count retweets as a sentiment
							# 		if parsed_tweet not in tweets:
							# 				tweets.append(parsed_tweet)
							# else:
							tweets.append(parsed_tweet)

					# return parsed tweets
					return tweets
			except tweepy.TweepError as e:
					# print error (if any)
					print("Error : " + str(e))

		def get_tweet_sentiment(self, tweet):
			'''
			Utility function to classify sentiment of passed tweet
			using textblob's sentiment method
			'''
			# create TextBlob object of passed tweet text (this is where analysis happens)
			analysis = TextBlob(self.clean_tweet(tweet))
			# set sentiment
			if analysis.sentiment.polarity > 0:
					return 'positive'
			elif analysis.sentiment.polarity == 0:
					return 'neutral'
			else:
					return 'negative'

		def clean_tweet(self, tweet):
			''' 
			Utility function to clean tweet text by removing links, special characters 
			using simple regex statements. 
			'''
			return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())


class TwitterClient(object):
		'''
		Generic twitter class for sentiment analysis
		'''
		def __init__(self):
				# attempt authentication
				try:
						# create OAuthHandler object
						self.auth = OAuthHandler(twitter_config.consumer_key, twitter_config.consumer_secret)
						# set access token and secret
						self.auth.set_access_token(twitter_config.access_token, twitter_config.access_token_secret)
						# create tweepy API object to fetch tweets
						self.api = tweepy.API(self.auth)
				except:
						print("Error: Authentication Failed")

		def clean_tweet(self, tweet):
				''' 
				Utility function to clean tweet text by removing links, special characters 
				using simple regex statements. 
				'''
				return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

		def get_tweet_sentiment(self, tweet):
				'''
				Utility function to classify sentiment of passed tweet
				using textblob's sentiment method
				'''
				# create TextBlob object of passed tweet text
				analysis = TextBlob(self.clean_tweet(tweet))
				# set sentiment
				if analysis.sentiment.polarity > 0:
						return 'positive'
				elif analysis.sentiment.polarity == 0:
						return 'neutral'
				else:
						return 'negative'

		def get_tweets(self, query, count = 10):
				'''
				Main function to fetch tweets and parse them.
				'''
				# empty list to store parsed tweets
				tweets = []

				try:
						# call twitter api to fetch tweets
						fetched_tweets = self.api.search(q = query, count = count)

						# parsing tweets one by one
						for tweet in fetched_tweets:
								# empty dictionary to store required params of a tweet
								parsed_tweet = {}

								# saving text of tweet
								parsed_tweet['text'] = tweet.text
								# saving sentiment of tweet
								parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)

								# appending parsed tweet to tweets list 
								if tweet.retweet_count > 0:
										# if tweet has retweets, ensure that it is appended only once
										if parsed_tweet not in tweets:
												tweets.append(parsed_tweet)
								else:
										tweets.append(parsed_tweet)

						# return parsed tweets
						return tweets

				except tweepy.TweepError as e:
						# print error (if any)
						print("get rekt m8")
						print("Error : " + str(e))

def makeData():
		# creating object of TwitterClient Class
		api = TwitterClient()

		myStreamListener = MyStreamListener()
		myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
		myStream.filter(track=charSets.filterSet)
		print('test')

if __name__ == "__main__":

		# localhost
		# port = 5000
		# app.run(host='localhost', port=port)

		# ec2 instance
		# serve(app, host="0.0.0.0", port=8000)

		thr = threading.Thread(target=makeData, args=(), kwargs={})
		if(not thr.is_alive()):
				thr.start()
		# thr.join()
		# calling main function