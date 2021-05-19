FROM python:3.8 as production

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /code

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./


#CMD ["uwsgi", "--ini", "uwsgi/app.ini"]

FROM production as development
COPY ./requirements.dev.txt .
RUN pip install --no-cache-dir -r requirements.dev.txt
