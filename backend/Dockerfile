FROM ubuntu:bionic

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONPATH .

WORKDIR /app

# install python 3.7.10 (or newer)
RUN apt update && \
    apt install --no-install-recommends -y build-essential software-properties-common && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt install --no-install-recommends -y python3.7 python3.7-dev python3.7-distutils && \
    apt clean && rm -rf /var/lib/apt/lists/*

# Register the version in alternatives (and set higher priority to 3.7)
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.6 1
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2

# Upgrade pip to latest version
RUN apt-get update \
    && apt-get -y install curl
RUN curl -s https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
    python3 get-pip.py --force-reinstall && \
    rm get-pip.py

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

ENV API_ENV DEV

CMD [ "python3", "app/main.py" ]
# CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80" ]
# CMD [, "app.main:app", "--host", "0.0.0.0", "--port", "80"]