current_branch=$(git rev-parse --abbrev-ref HEAD)

if [[ "$current_branch" =~ ^(develop|hotfix-.+)$ ]]
then
  git pull || exit 1
  yarn config set version-git-message "update: [allow $current_branch][skip ci] v%s"
  yarn version || exit 1
  git push || exit 1
  git push --tag || exit 1
else
  echo "ERROR: 请在 develop 或 hotfix-* 分支上执行本脚本"
  exit 1
fi


