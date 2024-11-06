# pylint: disable=C0303,C0301,C0114,C0413,W0611,C0116

import os
from unittest.mock import patch, mock_open, MagicMock
import unittest

from src.types import *
from src.util import *


class TestUtil(unittest.TestCase):
    """Unit Tests for utils"""

    @patch("src.util.to_type")
    def test_clean_line(self, mock_to_type):
        # Mocking to_type to return a fixed type based on its input
        mock_to_type.side_effect = lambda x: f"TypeOf_{x}"

        # Arrange
        line = "someMethod(param1).call(null, param2)"
        line_generic_method = "anotherMethod(param3).call(param4)"

        # Act
        result1 = clean_line(line)
        result2 = clean_line(line_generic_method)

        # Assert
        # Verify that to_type is called with expected arguments
        mock_to_type.assert_any_call("param1")  # Called once with param1
        mock_to_type.assert_any_call("param3")  # Called once with param3

        # Verify transformed line output
        expected_result1 = "someMethod<TypeOf_param1>(param2)"
        expected_result2 = "anotherMethod<TypeOf_param3>(param4)"

        self.assertEqual(result1, expected_result1)
        self.assertEqual(result2, expected_result2)

    def test_basic_types(self):
        # Test simple type mappings
        self.assertEqual(to_type("bool"), "boolean")
        self.assertEqual(to_type("int"), "number")
        self.assertEqual(to_type("float"), "number")
        self.assertEqual(to_type("JsDate"), "Date")
        self.assertEqual(to_type("DateTime"), "Date")
        self.assertEqual(to_type("Object"), "object | undefined")
        self.assertEqual(to_type("jQueryObject"), "JQuery | undefined")
        self.assertEqual(to_type("dynamic"), "any")

    def test_collections(self):
        # Test collection type mappings
        self.assertEqual(to_type("IList<string>"), "Array<string>")
        self.assertEqual(to_type("ss.IEnumerable<int>"), "Array<number>")
        self.assertEqual(to_type("ss.JsDictionary<string, int>"), "Record<string, number>")
        self.assertEqual(to_type("JsDictionary"), "Record<string,unknown>")

    def test_optional_types(self):
        # Test types with optional symbol (?)
        self.assertEqual(to_type("int?"), "number | undefined")
        self.assertEqual(to_type("JsDate?"), "Date | undefined")

    def test_delegate_and_dynamic(self):
        # Test mappings for delegate and dynamic types
        self.assertEqual(to_type("Delegate"), "Action<void> | undefined")
        self.assertEqual(to_type("delegate int"), "Action<number> | undefined")
        self.assertEqual(to_type("dynamic"), "any")

    def test_complex_types(self):
        # Test types with complex structures
        self.assertEqual(to_type("List<DateTime[]>"), "Array<Date[]>")
        self.assertEqual(to_type("ss.Dictionary<string, List<Date>>"), "Record<string, Array<Date>>")

    def test_keywords(self):
        # Test types with TypeScript keywords
        self.assertEqual(to_type("readonly int"), "number")
        self.assertEqual(to_type("sealed override bool"), "boolean")

    def test_bypass_conditions(self):
        # Test types that should return as-is without modification
        self.assertEqual(to_type("any"), "any")
        self.assertEqual(to_type("unknown"), "unknown")
        self.assertEqual(to_type("boolean"), "boolean")
        self.assertEqual(to_type("Array<number>"), "Array<number>")
        self.assertEqual(to_type("Record<string, Date>"), "Record<string, Date>")


if __name__ == "__main__":
    unittest.main()
