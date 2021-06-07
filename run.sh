#!/usr/bin/env python3
import sys
import argparse
import shutil
import subprocess

parser = argparse.ArgumentParser()
subparsers = parser.add_subparsers(dest="command")

run_install = subparsers.add_parser("install")
run_parser = subparsers.add_parser("run")

args = parser.parse_args()


def display_output(command):
    sys.stderr.buffer.write(command.stdout)
    if command.returncode == 0:
        return
    sys.stderr.buffer.write(command.stderr)
    sys.exit(command.returncode)


def install(args):
    shutil.move("env.example", "env")
    shutil.move("docker-compose.override.yml.example", "docker-compose.override.yml")

    command = subprocess.run(
        ["docker-compose", "build", "--force-rm"], capture_output=True
    )
    display_output(command)

    command = subprocess.run(
        ["docker-compose", "up", "-d", "database"], capture_output=True
    )
    display_output(command)

    script = """
        python manage.py migrate
        python manage.py createsuperuser --username admin --email admin@admin.pl --skip-checks --no-input
        python manage.py shell --command 'from django.contrib.auth.models import User;\
            user = User.objects.get(username="admin");\
            user.set_password("admin");user.save()'
        python manage.py loaddata categories budgets_and_transactions
    """
    command = subprocess.run(
        ["docker-compose", "run", "--rm", "backend" , "/bin/bash", "-c", script],
        capture_output=True,
    )
    display_output(command)


def run(args):
    command = subprocess.run(["docker-compose", "up", "-d"], capture_output=True)
    display_output(command)


if __name__ == "__main__":
    if args.command == "install":
        install(args)
    elif args.command == "run":
        run(args)
