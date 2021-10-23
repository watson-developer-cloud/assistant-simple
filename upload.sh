# Local .env
# https://gist.github.com/mihow/9c7f559807069a03e302605691f85572
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    # echo $KAGGLE_KEY
fi

curl -X POST -u "apikey:${apikey}" --header "Content-Type: application/json" \
		-d @training/bank_simple_workspace.json\
		"${url}/v1/workspaces/${workspace_id}?version=2021-06-14"
