import re
import twitter_config
import tweepy
from tweepy import OAuthHandler

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
						self.api = tweepy.API(self.auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
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