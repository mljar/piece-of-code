#!/bin/bash

jlpm run build

python -m build

cp dist/pieceofcode-0.1.0-py3-none-any.whl ../../studio/env_installer/extras/

