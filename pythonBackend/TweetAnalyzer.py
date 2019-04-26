import re
from textblob import TextBlob
import nltk
from nltk.corpus import twitter_samples

class TweetAnalyzer():
	num = 0

	charList = []

	def __init__(self, charList):
		self.charList = charList

	def analyze(self, tweetText):
		# print( "Analyze this text: " + tweetText)
		words = tweetText.split()
		# print(words)
		lowerWords = [x.lower() for x in words]
		wordSet = set(lowerWords)
		# with open("afterEpisode2.txt", "a") as file:
		# 	file.write(self.clean_tweet(status.text))
		# 	file.write("\n")
		for char in self.charList:
			if(not wordSet.isdisjoint(char.keywords)):
				self.num += 1
				# print("num sent to update character: " + str(self.num))
				self.updateCharacter(char, self.get_tweet_sentiment(tweetText))

	def updateCharacter(self, char, sentiment):
		if(sentiment== 'positive'):
			char.onPositive()
		elif(sentiment == 'negative'):
			char.onNegative()
		else:
			char.onNeutral()
		# char.printStatus()

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
