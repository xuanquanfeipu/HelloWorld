#!/bin/bash
#

echo "lizard Complexity begin==========="
python /opt/lizard/lizard.py java 10 ./source > /home/version/target/cyclomatic_complexity.txt
echo "lizard Complexity end  ==========="
