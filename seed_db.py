from database import crud, schemas
from database.database import SessionLocal, init_db

def seed_database():
    # Initialize the database and create tables
    init_db()

    db = SessionLocal()

    # Create admin user
    admin_user = schemas.UserCreate(email="admin@example.com", password="adminpassword")
    db_admin_user = crud.get_user_by_email(db, email=admin_user.email)
    if not db_admin_user:
        crud.create_user(db=db, user=admin_user)
        print("Admin user created successfully.")
    else:
        print("Admin user already exists.")

    # Create regular user
    regular_user = schemas.UserCreate(email="user@example.com", password="userpassword")
    db_regular_user = crud.get_user_by_email(db, email=regular_user.email)
    if not db_regular_user:
        crud.create_user(db=db, user=regular_user)
        print("Regular user created successfully.")
    else:
        print("Regular user already exists.")

    db.close()

if __name__ == "__main__":
    seed_database()
