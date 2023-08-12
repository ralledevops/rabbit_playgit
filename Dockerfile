# Use a version that matches the plugin's version
FROM rabbitmq:3.12-management

RUN apt-get update && apt-get install -y curl unzip file

# Download the correct version of the delayed message plugin
RUN curl -L -o /plugins/rabbitmq_delayed_message_exchange-3.12.0.ez https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v3.12.0/rabbitmq_delayed_message_exchange-3.12.0.ez && \
    file /plugins/rabbitmq_delayed_message_exchange-3.12.0.ez && \
    unzip -t /plugins/rabbitmq_delayed_message_exchange-3.12.0.ez

# Enable the plugin
RUN rabbitmq-plugins enable --offline rabbitmq_delayed_message_exchange
