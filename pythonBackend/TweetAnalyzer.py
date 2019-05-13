import re
from textblob import TextBlob
import nltk
from nltk.corpus import twitter_samples
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

sia = SIA()
results = []

class TweetAnalyzer():
	num = 0
	numberAdded = 0
	charList = []

	def __init__(self, charList):
		self.charList = charList

	def analyze(self, tweetText):
		# print( "Analyze this text: " + tweetText)
		# FOR READING LIVE, ADD THIS
		for char in self.charList:
			self.charMatch(char, tweetText)
		# FOR READING FROM DATA, ADD THIS
		# for char in self.charList:
		# 	self.charMatchQue(char, self.clean_tweet(tweetText).lower().split())

	def getPolarityScores(self, tweetText):
		# print( "Analyze this text: " + tweetText)
		words = tweetText.split()
		analysis = TextBlob(self.clean_tweet(tweetText))
		pol_score = sia.polarity_scores(tweetText)
		return [analysis.sentiment.polarity, pol_score];

	def charMatch(self, char, tweetText):
		for keyword in char.keywords:
			if(keyword in tweetText.lower()):
				self.num+=1
				self.updateCharacter(char, self.get_tweet_sentiment(tweetText))
				break

	def charMatchQue(self, char, tweetText):
		test = char.keywords.intersection(tweetText)
		if(len(test)>0):
			char.addToQue(tweetText)
			if(char.name == 'Game of Thrones'):
				self.numberAdded = self.numberAdded+1
				print('num thrones tweets added to queue: ' + str(self.numberAdded))

	# Update the given character with a sentiment datapoint. 
	# Return the sentiment as a string value (commented out now)
	def updateCharacter(self, char, sentiment):
		if(sentiment== 'positive'):
			char.onPositive()
		elif(sentiment == 'negative'):
			char.onNegative()
		else:
			char.onNeutral()

	def get_tweet_sentiment(self, tweet):
		'''
		Utility function to classify sentiment of passed tweet
		using textblob's sentiment method
		'''
		# create TextBlob object of passed tweet text (this is where analysis happens)
		# FOR READING FROM DATA, ADD THIS
		# analysis = TextBlob(' '.join(tweet))
		# FOR READING LIVE, ADD THIS
		# analysis = TextBlob(tweet)
		pol_score = sia.polarity_scores(tweet)
		# set sentiment
		# if analysis.sentiment.polarity > 0:
		# 		return 'positive'
		# elif analysis.sentiment.polarity == 0:
		# 		return 'neutral'
		# else:
		# 		return 'negative'
		val = pol_score.get('compound')
		print(tweet)
		print('above score: ' + str(val))
		if val> 0:
			return 'positive'
		elif val == 0:
			return 'neutral'
		else:
			return 'negative'

	def clean_tweet(self, tweet):
		''' 
		Utility function to clean tweet text by removing links, special characters 
		using simple regex statements. 
		'''
		return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
