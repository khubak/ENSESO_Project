import logging
import os
from flask import g, request
from datetime import datetime
import glob


class RequestFileHandler(logging.Handler):
    def __init__(self, log_dir, max_logs=10):
        super().__init__()
        self.log_dir = log_dir
        self.max_logs = max_logs
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)

    def emit(self, record):
        # Ensure only a limited number of log files exist
        self._rotate_logs()

        # Use a unique log file for each request
        log_filename = os.path.join(self.log_dir, f"{g.request_id}.log")
        with open(log_filename, 'a') as log_file:
            log_file.write(self.format(record) + '\n')

    def _rotate_logs(self):
        logs = sorted(glob.glob(os.path.join(
            self.log_dir, '*.log')), key=os.path.getctime)
        while len(logs) >= self.max_logs:
            os.remove(logs.pop(0))


def setup_logging():
    # Ensure log directory exists
    script_dir = os.path.dirname(os.path.abspath(__file__))
    log_dir = os.path.join(script_dir, 'logs')

    # Configure logging
    # Create handlers
    request_handler = RequestFileHandler(log_dir=log_dir, max_logs=6)

    # Set level
    request_handler.setLevel(logging.INFO)

    # Create formatter and add it to the handler
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    request_handler.setFormatter(formatter)

    # Get the root logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)

    # Add handler to the logger if not already added
    if not any(isinstance(handler, RequestFileHandler) for handler in logger.handlers):
        logger.addHandler(request_handler)

    return logger
