"""Script to seed database."""

import os
import json
import crud
import model
import server

os.system("createdb codele")

model.connect_to_db(server.app)
model.db.create_all()


