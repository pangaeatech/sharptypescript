# pylint: disable=C0303,C0301,C0114,C0413,W0611

import os, sys
from unittest.mock import patch, mock_open, Mock
import unittest

from src import read_js


class TestSalt2Type(unittest.TestCase):
    """Unit Tests for salt2type"""

    def test_stuff(self):
        """Default test"""
        self.assertEqual(1, 1)


if __name__ == "__main__":
    unittest.main()
