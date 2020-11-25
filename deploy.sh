#!/bin/bash

USERNAME="blindgren"

rsync -avz dist/ "$USERNAME"@srv1.melodious.io:/var/www/melodious.io/