import csv  
import json  
  
# Open the CSV  
f = open( '../../../data/data_raw.csv', 'rU' )  
# Change each fieldname to the appropriate field name. I know, so difficult.  
reader = csv.DictReader( f, fieldnames = ( "id.exposure","id.outcome","outcome","exposure","method","nsnp","b","se","pval"))  
# Parse the CSV into JSON  
out = json.dumps( [ row for row in reader ] )  
print ("JSON parsed!")  
# Save the JSON  
f = open( '../../../data/data_formatted.json', 'w')  
f.write(out)  
print ("JSON saved!")  