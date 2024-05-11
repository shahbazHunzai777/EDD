import pandas as pd

# Read HTML file into Pandas DataFrame
df = pd.read_html('input.html')[0]

# Write DataFrame to Excel file
df.to_excel('output.xlsx', index=False)
