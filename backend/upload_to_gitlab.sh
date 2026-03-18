#!/bin/bash
read -p "Please enter your GitLab repository URL: " gitlab_url
git remote add gitlab "$gitlab_url"
git push -u gitlab dipak_test
