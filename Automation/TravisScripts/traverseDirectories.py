# Import the os module, for the os.walk function
import os

# Set the directory you want to start from
rootDir = '../../API/'
for dirName, subdirList, fileList in os.walk(rootDir):
    print('Found directory: %s' % dirName)
    #for fname in fileList:
        #print('\t%s' % fname)
    if 'index.js' in fileList:
        print('index.js!')
