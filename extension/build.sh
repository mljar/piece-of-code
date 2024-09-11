#!/bin/bash

jlpm run build

python -m build

cp dist/pieceofcode-0.4.0-py3-none-any.whl ../../studio/env_installer/extras/

sha256sum dist/pieceofcode-0.4.0-py3-none-any.whl