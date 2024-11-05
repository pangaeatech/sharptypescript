# pylint: disable=C0303,C0301,C0114,C0413,W0611

import os
from unittest.mock import patch, mock_open, MagicMock
import unittest

from src.types import *
from src.methods import *


class TestMethods(unittest.TestCase):
    """Unit Tests for methods"""

    @patch("builtins.open", new_callable=mock_open)
    @patch("os.path.join")
    @patch("src.util.write_imports")
    @patch("src.util.fix_body_line")
    def test_gen_index(self, mock_fix_body_line, mock_write_imports, mock_path_join, mock_open):
        # Arrange
        out_dir = "test_out_dir"
        defs = [ClassDef(), ClassDef()]  # Sample list of ClassDef objects
        globs = ["global line 1", "global line 2"]
        extra_imports = ["extra_import_1", "extra_import_2"]

        mock_path_join.return_value = "test_out_dir/src/index.ts"

        # Mock behavior of fix_body_line
        mock_fix_body_line.side_effect = lambda line: f"fixed_{line}"

        # Act
        gen_index(out_dir, defs, globs, extra_imports)

        # Assert
        # Check if os.path.join is called correctly to create the file path
        mock_path_join.assert_called_once_with(out_dir, "src", "index.ts")

        # Check if write_imports is called correctly
        mock_write_imports.assert_called_once_with(defs, mock_open(), "", "", "", extra_imports)

        # Check that each line from globs is processed by fix_body_line and written to file
        handle = mock_open()
        expected_writes = [f"fixed_{glob}\n" for glob in globs]
        handle.write.assert_any_call("\n")  # Checks that a newline is written after imports

        for expected_write in expected_writes:
            handle.write.assert_any_call(expected_write)

        # Ensure file write is closed
        handle.close.assert_called_once()


if __name__ == "__main__":
    unittest.main()
