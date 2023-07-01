import argparse


def car_catalog():
    parser = argparse.ArgumentParser(description='Car catalog')

    parser.add_argument('-a', '--add', action='store_true', help='Add a new user')
    parser.add_argument('-d', '--delete', type=str, metavar='ID', help='Delete user with ID')

    args = parser.parse_args()

    if args.add:
        add_new_user()
    if args.delete:
        delete_user(args.delete)


def add_new_user():
    print('You have selected add a new use.')


def delete_user(user_id: str):
    print('Deleting the user with the ID ' + user_id + "...")


if __name__ == '__main__':
    car_catalog()
