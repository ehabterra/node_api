#!/usr/bin/env bash


osas=""
winpty=""

case "$OSTYPE" in
   solaris*)      osas="SOLARIS" ;;
   darwin*)       osas="OSX" ;;
   linux*)        osas="LINUX" ;;
   bsd*)          osas="BSD" ;;
   msys*)         osas="WINDOWS" ;;
   win32*)        osas="WINDOWS" ;;
   WindowsNT*)    osas="WINDOWS" ;;
#   *)             echo "unknown: $OSTYPE" ;;
esac
if [[ "$osas" == 'WINDOWS' ]]; then
    winpty="winpty"
fi

project_name='todd'
d="${winpty} docker-compose -p ${project_name}"
c=""
wd="$PWD"

run() {
    case $1 in
        "start")
            ${c} && ${d} up -d mysql && ${d} up -d nodejs
            ;;
        "stop")
            ${c} && ${d} stop
            ;;
        "stop_nodejs")
            ${c} && ${d} stop nodejs
            ;;
        "down")
            ${c} && ${d} down
            ;;
        "restart_nodejs")
            ${c} && ${d} exec nodejs ./node_modules/.bin/tsc && ${d} restart nodejs
            ;;
        "restart_all")
            ${c} && ${d} restart
            ;;
        "rebuild_then_start")
            ${c} && ${d} up --build -d mysql && ${d} up --build -d nodejs
            ;;
        "recreate_then_start")
            ${c} && ${d} up -d --force-recreate mysql && ${d} up --force-recreate -d nodejs
            ;;
        "nodejs_bash")
            ${c} && ${d} exec nodejs bash
            ;;
        "mysql_bash")
            ${c} && ${d} exec mysql bash
            ;;
        "mysql_logs")
            ${c} && ${d} logs -f mysql
            ;;
        "nodejs_logs")
            ${c} && ${d} logs -f nodejs
            ;;            
        "list_containers")
            ${c} && ${d} ps
            ;;
        "start_docker_service")
            service docker start
            ;;
        "nodejs_dev")
            ${c} && ${d} exec nodejs npm run dev
            ;;
        "nodejs_start")
            ${c} && ${d} exec nodejs npm start
            ;;
        "nodejs_build")
            ${c} && ${d} exec nodejs ./node_modules/.bin/tsc
            ;;
        "migrate")
            ${c} && ${d} exec nodejs npx sequelize-cli db:migrate
            ;;
        "migrate_undo")
            ${c} && ${d} exec nodejs npx sequelize-cli db:migrate:undo
            ;;
        "seed_all")
            ${c} && ${d} exec nodejs npx sequelize-cli db:seed:all
            ;;
        "seed_undo_all")
            ${c} && ${d} exec nodejs npx sequelize-cli db:seed:undo:all
            ;;
        *)
            echo invalid option
            ;;
    esac
}

if [ ! -z "$1" ]
    then
        option="$1"
        run ${option}
else
    PS3='Please enter your choice: '
    options=(
        "start"
        "stop"
        "stop_nodejs"
        "down"
        "restart_nodejs"
        "restart_all"
        "rebuild_then_start"
        "recreate_then_start"
        "nodejs_bash"
        "mysql_bash"
        "mysql_logs"
        "nodejs_logs"
        "list_containers"
        "start_docker_service"
        "nodejs_dev"
        "nodejs_start"
        "nodejs_build"
        "migrate"
        "migrate_undo"
        "seed_all"
        "seed_undo_all"
    )
    select option in "${options[@]}"
    do
        run ${option}
        break
    done
fi
