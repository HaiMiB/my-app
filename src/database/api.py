from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import psycopg2
import psycopg2.extras
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Establish a connection to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="postgres",
    user="postgres",
    password="root"
)

##### GET
@app.route('/tasks/<int:id>', methods=['GET'])
@cross_origin()
def get_task_by_id(id):
    # Create a cursor to perform database operations
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT * FROM tasks WHERE ID = %s", (id,))
    task = cur.fetchone()
    cur.close()
    if task is not None:
        return jsonify(dict(task))
    else:
        return jsonify({"error": "task not found"}), 404

@app.route('/tasks/<string:date>', methods=['GET'])
@cross_origin()
def get_task_ids_by_date(date):

    date_obj = datetime.strptime(date, '%Y-%m-%d').date()

    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute("SELECT id FROM tasks WHERE date = %s", (date_obj,))
        tasks = cur.fetchall()
        cur.close()
        
        return jsonify([dict(task) for task in tasks])

    except (psycopg2.Error, psycopg2.DatabaseError) as error:
        print("Error retrieving data from PostgreSQL:", error)

    return jsonify([])

@app.route('/tasks', methods=['GET'])
@cross_origin()
def get_tasks():
    try:
        # Create a cursor to perform database operations
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # Execute the SELECT query
        cur.execute("SELECT * FROM tasks")

        # Fetch all rows from the result set
        tasks = cur.fetchall()

        # Close the cursor
        cur.close()

        # Return the rows as a JSON response
        return jsonify([dict(task) for task in tasks])


    except (psycopg2.Error, psycopg2.DatabaseError) as error:
        print("Error retrieving data from PostgreSQL:", error)

    return jsonify([])

###### POST
@app.route('/tasks', methods=['POST'])
@cross_origin()
def add_message():
    try:
        # Get the JSON data from the request body
        data = request.get_json()
        print("DATA", data)

        # Create a cursor to perform database operations
        cur = conn.cursor()

        # Execute the INSERT query
        cur.execute("INSERT INTO tasks (title, description, status, created_at) VALUES (%s, %s, %s, %s)",
                    (data['title'], data['description'], data['status'], data['created_at']))

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cur.close()

        # Return a success response
        return jsonify({'message': 'task added successfully'})

    except (psycopg2.Error, psycopg2.DatabaseError) as error:
        print("Error adding task to PostgreSQL:", error)

    # Return an error response
    return jsonify({'message': 'Failed to add task'})

##### DELETE
@app.route('/tasks/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_task_by_id(id):
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute("DELETE FROM tasks WHERE ID = %s", (id,))
        conn.commit()
        cur.close()
        return jsonify({'status': 'success', 'message': 'task deleted successfully'}), 200
    except (psycopg2.Error, psycopg2.DatabaseError) as error:
        print("Error updating message in PostgreSQL:", error)

    # Return an error response
    return jsonify({'message': 'Failed to update message'})

##### UPDATE
@app.route('/tasks/<int:id>', methods=['PUT'])
@cross_origin()
def update_task(id):
    try:
        # Get the JSON data from the request body
        data = request.get_json()
        print("DATA", data)

        # Create a cursor to perform database operations
        cur = conn.cursor()

        # Execute the UPDATE query
        cur.execute("UPDATE tasks SET title = %s, description = %s, status = %s WHERE id = %s",
                    (data['title'], data['description'], data['status'], id))

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cur.close()

        # Return a success response
        return jsonify({'message': 'Message updated successfully'})

    except (psycopg2.Error, psycopg2.DatabaseError) as error:
        print("Error updating to PostgreSQL:", error)

    # Return an error response
    return jsonify({'message': 'Failed to add message'})

if __name__ == '__main__':
    app.run(port=5000)
    conn.close()
