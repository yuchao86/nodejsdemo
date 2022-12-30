#!/bin/bash

currentPath=`dirname $0`
echo
echo "当前工作目录:$currentPath"
echo
echo $1
echo $2

cd $currentPath

if [ $1 == 'js' ]
then
    `protoc --js_out=import_style=commonjs,binary:. $2`
elif [ $1 == 'java' ]
then
    `protoc --java_out=./pb/ -I./ $2`
elif [ $1 == 'c#' ]
then
    `protoc --csharp_out=./pb/ -I./ $2`
fi
echo "protoc编译完毕,往文件头添加包名"