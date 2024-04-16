# Messager (frontend)

Messager is a system that can be used to notify the user with a message on the screen, see ![here](https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/tree/main/frontend/src/components/messager)

It can be used by importing the two functionalities it provides, "info" and "error", which are both a type of a message with a different color coding, example: import { info, error as displayError } from 'path/messager', info("Informational message to the user");

# Logger (backend)

Winston is used for handling the backend errors, which can be found under ![here](https://github.com/Kurssiesitieto/kurssiesitieto-ohtuprojekti/blob/main/backend/middleware/logger.js)

You can use the logger by using logger.[somemessagelevel]([yourmessage]), after which the logger will format the messages automatically. It is also possible to control which messages to display via the environment variable LOGGING_LEVEL, as well as modify the levels to your liking.