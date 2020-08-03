import numpy as np
import pandas as pd
import sys
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import f1_score
from sklearn.metrics import accuracy_score
from sklearn.metrics import mean_absolute_error

ocean_input = sys.argv[1]
aptitude_input = sys.argv[2]
# Input from node is always in the form of string, even list sent from node is converted to string
ocean_input = ocean_input.split(',')
aptitude_input = aptitude_input.split(',')

personality1_arr = ["Literature","Banking & Finance","Mass & Media","Public & Political Affairs","Engineering","Travel & Tourism","Agriculture","Psychology","Weather & Environmental Sci.","Medical","Management","Education","Mathematics & Analysis","Design","Defense"]
personality2_arr = ["Engineering","Literature","Mass & Media","Public & Political Affairs","Banking & Finance","Psychology","Defense","Travel & Tourism","Agriculture","Management","Weather & Environmental Sci.","Medical","Design","Mathematics & Analysis","Education"]
aptitude_arr = ["Mathematics & Analysis","Management","Public & Political Affairs","Design","Medical","Weather & Environmental Sci.","Psychology","Defense","Banking & Finance","Education","Mass & Media","Literature","Engineering","Travel & Tourism","Agriculture"]

O = float(ocean_input[0])
C = float(ocean_input[1])
E = float(ocean_input[2])
A = float(ocean_input[3])
numerical = float(aptitude_input[0])
perceptual = float(aptitude_input[1])
verbal = float(aptitude_input[2])
abstractApti = float(aptitude_input[3])
spatial = float(aptitude_input[4])

p1=([[O,C,E,A]])
p2=([[O,C,E,A]])
a1=([[numerical,spatial,perceptual,abstractApti,verbal]])
#ccc=classifier.predict(kl)

# Load the model from the file
personality1 = joblib.load('personality1.pkl')
personality2 = joblib.load('personality2.pkl')
aptitude = joblib.load('aptitude.pkl')

# Use the loaded model to make predictions
personality1_result = personality1.predict(p1)
personality2_result = personality2.predict(p2)
aptitude_result = aptitude.predict(a1)

if (personality1_result[0] == personality2_result[0] == aptitude_result[0]):
    result = personality1_arr[personality1_result[0]] 
elif (personality1_result[0] == personality2_result[0]):
    result = personality1_arr[personality1_result[0]] + "," + aptitude_arr[aptitude_result[0]] 
elif (personality1_result[0] == aptitude_result[0]):
    result = personality1_arr[personality1_result[0]] + "," + personality2_arr[personality2_result[0]] 
elif (personality2_result[0] == aptitude_result[0]):
    result = personality1_arr[personality1_result[0]] + "," + personality2_arr[personality2_result[0]]
else:
    result = personality1_arr[personality1_result[0]] + "," + personality2_arr[personality2_result[0]] + "," + aptitude_arr[aptitude_result[0]]

print(result)