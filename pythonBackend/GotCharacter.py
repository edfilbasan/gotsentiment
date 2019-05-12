import threading
import queue
from textblob import TextBlob

def init_value(num):
	return num if num else 0

def init_arr(arr):
	return arr if arr else [0]

def increment_votes(current_value):
	return current_value + 1 if current_value else 1

def decrement_votes(current_value):
	return current_value - 1 if current_value else -1


# cerseiLock = threading.Lock()
# danyLock = threading.Lock()
# jonLock = threading.Lock()
# aryaLock = threading.Lock()
# sansaLock = threading.Lock()
# branLock = threading.Lock()
# tyrionLock = threading.Lock()
# jaimeLock = threading.Lock()

# def getCharLock(name):
# 	print("name getting lock: " + name)
# 	if(name == 'cersei'):
# 		return cerseiLock
# 	elif(name == 'daenerys'):
# 		return danyLock
# 	elif(name == 'jon'):
# 		return jonLock
# 	elif(name == 'arya'):
# 		return aryaLock
# 	elif(name == 'bran'):
# 		return branLock
# 	elif(name == 'tyrionLock'):
# 		return tyrionLock
# 	else:
# 		return jaimeLock


class GotCharacter():
	ref = ""
	net = 0
	positive = 0
	negative = 0
	neutral = 0
	total = 0
	netArr = [0]

	name = ""
	keywords = {}
	decayPosTimerStarted = False
	decayNegTimerStarted = False

	def __init__(self, ref, name, keywords):
		self.name = name
		self.ref = ref
		self.decayPosTimerStarted = False
		self.decayNegTimerStarted = False
		self.tweetQueue = queue.Queue()
		try:
			self.net = 	init_value(ref.child('net').get())
			self.positive = init_value(ref.child('positive').get())
			self.negative = init_value(ref.child('negative').get())
			self.neutral = init_value(ref.child('neutral').get())
			self.total = init_value(ref.child('total').get())
			self.keywords = keywords
			self.total = init_arr(ref.child('netArr').get())
		except Exception as e:
			print(e)
			print("GotCharacter init exception")

	def checkData(name):
		if(name=="The Hound"):
			print("hound found")
			self.printStatus()

	def onPositive(self):
		self.positive = self.positive+1
		self.net = self.net+1
		self.total = self.total+1
		try:
			# with getCharLock(self.name):
				# self.ref.child('net').transaction(increment_votes)
			self.ref.update({
				'net': self.net,
				'positive': self.positive,
				'total': self.total
			})
			# 	self.ref.child('positive').transaction(increment_votes)
			# 	self.ref.child('total').transaction(increment_votes)
		except Exception as e:
			print(e)
			print("onPositive exception")
		self.checkDecay()

	def onNegative(self):
		self.negative = self.negative+1
		self.net = self.net-1
		self.total = self.total+1
		try:
			self.ref.update({
				'net': self.net,
				'negative': self.negative,
				'total': self.total
			})
			# with getCharLock(self.name):
				# self.ref.child('net').transaction(decrement_votes)
				# self.ref.child('negative').transaction(increment_votes)
				# self.ref.child('total').transaction(increment_votes)
		except Exception as e:
			print(repr(e))
			print("onNegative exception")
		self.checkDecay()

	def onNeutral(self):
		self.neutral = self.neutral+1
		self.total = self.total+1
		try:
			self.ref.update({
				'total': self.total
			})
			# with getCharLock(self.name):
				# self.ref.child('neutral').transaction(increment_votes)
				# self.ref.child('total').transaction(increment_votes)
		except Exception as e:
			print(e)
			print("onNeutral exception")
		self.checkDecay()

	def updateCharacter(self, sentiment):
		if(sentiment== 'positive'):
			self.onPositive()
			# return 'positive' 
		elif(sentiment == 'negative'):
			self.onNegative()
			# return 'negative'
		else:
			self.onNeutral()
			# return 'neutral'
		# char.printStatus()

	def get_tweet_sentiment(self, tweet):
		'''
		Utility function to classify sentiment of passed tweet
		using textblob's sentiment method
		'''
		# create TextBlob object of passed tweet text (this is where analysis happens)
		# analysis = TextBlob(' '.join(tweet))
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
		print(pol_score.composite)
		if pol_score.composite > 0:
			return 'positive'
		elif pol_score.composite == 0:
			return 'neutral'
		else:
			return 'negative'

	def checkDecay(self):
		# val = self.ref.child('net').get()
		val = 0
		if(not val is None):
			try:
				# with getCharLock(self.name):
					if(val > 0):
						self.startPositiveDecayTimer()
						# self.ref.child('net').transaction(decrement_votes)
						# self.net = self.net-1
					elif(val<= -2) :
						# self.ref.child('net').transaction(increment_votes)
						# self.net = self.net+1
						self.startNegativeDecayTimer()
					else:
						pass
					# self.printStatus()
			except Exception as e:
				print(e)
				print("netDecay exception")

	def startPositiveDecayTimer(self):
		if(not self.decayPosTimerStarted):
			self.decayPosTimerStarted = True
			threading.Timer(10.0, self.decayPos).start()

	def startNegativeDecayTimer(self):
		if(not self.decayNegTimerStarted):
			self.decayNegTimerStarted = True
			threading.Timer(10.0, self.decayNeg).start()

	def decayPos(self):
		val = self.ref.child('net').get()
		if(val > 0):
			try:
				self.ref.child('net').transaction(decrement_votes)
				self.net = self.net-1
			except Exception as e:
				print(e)
				print("failed to decay from positive")
		self.decayPosTimerStarted = False
		self.checkDecay()

	def decayNeg(self):
		val = self.ref.child('net').get()
		if(val < -5):
			try:
				self.ref.child('net').transaction(increment_votes)
				self.net = self.net+1
			except Exception as e:
				print(e)
				print('failed to decay from negative')
		self.decayNegTimerStarted = False
		self.checkDecay()

	def addToQue(self, tweetText):
		self.tweetQueue.put(tweetText)

	def popQue(self):
		return self.tweetQueue.get()

	def getQueue(self):
		return self.tweetQueue

	def printStatus(self):
		print("\n");
		print("Name: " + self.name + "\nNet: " + str(self.net) + "\nPositive: " + str(self.positive) + \
			"\nNegative: " + str(self.negative) + "\nNeutral: " + str(self.neutral) + "\nTotal: " + str(self.total))
