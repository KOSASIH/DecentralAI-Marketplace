import os
import sqlite3

class ModelRepository:
    def __init__(self, db_file="model_repository.db"):
        self.db_file = db_file
        self.conn = sqlite3.connect(db_file)
        self.cursor = self.conn.cursor()
        self.create_table()

    def create_table(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS models (
                id INTEGER PRIMARY KEY,
                name TEXT,
                description TEXT,
                data BLOB
            )
        """)
        self.conn.commit()

    def store_model(self, model_name, model_description, model_data):
        self.cursor.execute("""
            INSERT INTO models (name, description, data)
            VALUES (?,?,?)
        """, (model_name, model_description, model_data))
        self.conn.commit()

    def get_model(self, model_name):
        self.cursor.execute("""
            SELECT data FROM models
            WHERE name =?
        """, (model_name,))
        model_data = self.cursor.fetchone()[0]
        return model_data

    def update_model(self, model_name, model_data):
        self.cursor.execute("""
            UPDATE models
            SET data =?
            WHERE name =?
        """, (model_data, model_name))
        self.conn.commit()

    def delete_model(self, model_name):
        self.cursor.execute("""
            DELETE FROM models
            WHERE name =?
        """, (model_name,))
        self.conn.commit()

    def close(self):
        self.conn.close()
