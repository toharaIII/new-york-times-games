import os

def main():
    sourcePath=r"/Users/treyohara/Desktop/wordle desktop app/Word lists in csv"
    destinationPath=r"/Users/treyohara/Desktop/wordle desktop app/5 letter dictionary.csv"

    files=os.listdir(sourcePath)

    for file in files:
        filepath=os.path.join(sourcePath, file)
        print(f"Parsing file: {filepath}")
        with open(filepath, 'r', errors='ignore') as file, open(destinationPath, 'a') as destination:
            previousLine=None
            for lineNum, line in enumerate(file, start=1):
                currentLine=line.strip()
                if previousLine is None:
                    if len(currentLine)==5:
                        destination.write(currentLine)
                        previousLine=currentLine
                        continue
                elif len(currentLine)==5:
                    if currentLine != previousLine:
                        destination.write(line)
                        previousLine=currentLine
    
    print("done :D")

if __name__=="__main__":
    main()