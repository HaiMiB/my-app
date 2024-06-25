import psycopg2

# Establish a connection to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="postgres",
    user="postgres",
    password="root"
)

# Create a cursor object to execute SQL queries
cur = conn.cursor()

# Execute the SELECT query to fetch all records from the "messages" table
cur.execute("SELECT * FROM tasks")

# Fetch all the rows returned by the query
rows = cur.fetchall()

# Iterate over the rows and print the data
for row in rows:
    print("ID:", row[0])
    print("Title:", row[1])
    print("Description:", row[2])
    print("State:", row[3])
    print("Date:", row[4])
    print()

# Close the cursor and connection
cur.close()
conn.close()
