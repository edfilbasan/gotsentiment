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
		# words = tweetText.split()
		# # print(words)
		# lowerWords = [x.lower() for x in words]
		# wordSet = set(lowerWords)
		# with open("afterEpisode2.txt", "a") as file:
		# 	file.write(self.clean_tweet(status.text))
		# 	file.write("\n")
		# FOR READING LIVE, ADD THIS
		for char in self.charList:
			self.charMatch(char, tweetText)
		# FOR READING FROM DATA, ADD THIS
		# for char in self.charList:
		# 	self.charMatchQue(char, self.clean_tweet(tweetText).lower().split())
			# if(not wordSet.isdisjoint(char.keywords)):
			# 	self.num += 1
			# 	# print("num sent to update character: " + str(self.num))
			# 	self.updateCharacter(char, self.get_tweet_sentiment(tweetText))
		# print("num sent to update character: " + str(self.num))

	def getPolarityScores(self, tweetText):
		# print( "Analyze this text: " + tweetText)
		words = tweetText.split()

		analysis = TextBlob(self.clean_tweet(tweetText))
		# print("THE TWEET")
		# print(tweet)
		pol_score = sia.polarity_scores(tweetText)
		# print("pol score")
		# print(pol_score)
		# print(analysis.sentiment.polarity)
		# set sentiment
		return [analysis.sentiment.polarity, pol_score];

	def charMatch(self, char, tweetText):
		for keyword in char.keywords:
			if(keyword in tweetText.lower()):
				# print(tweetText)
				self.num+=1
				self.updateCharacter(char, self.get_tweet_sentiment(tweetText))
				break

	def charMatchQue(self, char, tweetText):
		test = char.keywords.intersection(tweetText)
		# print('truth: ')
		# print(len(test))
		if(len(test)>0):
		# for keyword in char.keywords:
		# 	if(keyword in tweetText.lower()):
		# 		# print('add to que: ' + tweetText)
				char.addToQue(tweetText)
				if(char.name == 'Game of Thrones'):
					self.numberAdded = self.numberAdded+1
					print('num thrones tweets added to queue: ' + str(self.numberAdded))

	# Update the given character with a sentiment datapoint. 
	# Return the sentiment as a string value (commented out now)
	def updateCharacter(self, char, sentiment):
		if(sentiment== 'positive'):
			char.onPositive()
			# return 'positive' 
		elif(sentiment == 'negative'):
			char.onNegative()
			# return 'negative'
		else:
			char.onNeutral()
			# return 'neutral'
		# char.printStatus()

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
		# print("THE TWEET")
		# print(tweet)
		pol_score = sia.polarity_scores(tweet)
		# print("pol score")
		# print(pol_score)
		# print(analysis.sentiment.polarity)
		# set sentiment
		# if analysis.sentiment.polarity > 0:
		# 		return 'positive'
		# elif analysis.sentiment.polarity == 0:
		# 		return 'neutral'
		# else:
		# 		return 'negative'
		print('pls')
		print(pol_score.get('compound'))
		val = pol_score.get('compound')
		if val> 0:
			return 'positive'
		elif val == 0:
			print('is neutral')
			return 'neutral'
		else:
			return 'negative'

	def clean_tweet(self, tweet):
		''' 
		Utility function to clean tweet text by removing links, special characters 
		using simple regex statements. 
		'''
		return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())
