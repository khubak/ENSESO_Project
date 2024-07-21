import logging
from logging.handlers import RotatingFileHandler
import os


def setup_logging():
    # Ensure log directories exist
    script_dir = os.path.dirname(os.path.abspath(__file__))
    log_dir = os.path.join(script_dir, 'logs')
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Configure logging
    # Create handlers
    general_handler = RotatingFileHandler(os.path.join(
        log_dir, 'general.log'), maxBytes=10000, backupCount=1)
    error_handler = RotatingFileHandler(os.path.join(
        log_dir, 'errors.log'), maxBytes=10000, backupCount=1)

    # Set levels
    general_handler.setLevel(logging.INFO)
    error_handler.setLevel(logging.ERROR)

    # Create formatters and add them to the handlers
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    general_handler.setFormatter(formatter)
    error_handler.setFormatter(formatter)

    # Get the root logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)

    # Add handlers to the logger
    logger.addHandler(general_handler)
    logger.addHandler(error_handler)

    return logger
