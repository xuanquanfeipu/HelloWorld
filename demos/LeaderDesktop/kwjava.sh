#!/bin/bash

echo "kw check begin==========="
#python /opt/lizard/lizard.py java 10 ./source > /home/version/target/cyclomatic_complexity.txt
cd ..
SHARESPACE=`pwd`
echo "SHARESPACE=$SHARESPACE" 
KW_CHECK_DIR=$SHARESPACE/target/Klocwork/klocwork_check_java/kwcheck
echo "KW_CHECK_DIR=$KW_CHECK_DIR"
if [ -d "$KW_CHECK_DIR" ];then
  echo "rm -rf $KW_CHECK_DIR/" 
	rm -rf $KW_CHECK_DIR/
fi
echo "mkdir -p $KW_CHECK_DIR" 
mkdir -p $KW_CHECK_DIR
echo "cd $SHARESPACE" 
cd $SHARESPACE
kwant -f $SHARESPACE/source/source/webservice/build/build.xml -o $KW_CHECK_DIR/kw.out
kwbuildproject -url http://10.40.66.138:8080/GoldenData-UOC-ZAGWV1.01.x -tables-directory $KW_CHECK_DIR/table $KW_CHECK_DIR/kw.out --force
kwadmin --url http://10.40.66.138:8080 load GoldenData-UOC-ZAGWV1.01.x $KW_CHECK_DIR/table
echo "kw check end  ==========="

#kwauth --url http://10.40.66.138:8080
echo "=======kwauth1========="
cat  ~/.klocwork/ltoken
KW_LTOKEN=`cat ~/.klocwork/ltoken |cut -d ';' -f 4`
echo "=======KW_LTOKEN=========${KW_LTOKEN}"
echo 'curl --data "action=search&user=ct-changsha&ltoken=${KW_LTOKEN}&project=GoldenData-UOC-ZAGWV1.01.x&query=severity:Critical,Error" http://10.40.66.138:8080/review/api -s|jq "{id:.id, status:.status, severity:.severity, severityCode:.severityCode, code:.code, title:.title, message:.message, file:.file, method:.method, line:.line, owner:.owner, trace:.trace}" > $KW_CHECK_DIR/kw_result.json'
curl --data "action=search&user=ct-changsha&ltoken=${KW_LTOKEN}&project=ZXCLOUD-iBOX-APP-KW&query=severity:Critical,Error" http://10.40.66.138:8080/review/api -s |jq "{id:.id, status:.status, severity:.severity, severityCode:.severityCode, code:.code, title:.title, message:.message, file:.file, method:.method, line:.line, owner:.owner, trace:.trace}" > $KW_CHECK_DIR/kw_result.json
echo 'curl end ...........'
#cat $KW_CHECK_DIR/kw_result.json 
KW_ISSUES_CNT=`jq ".id" $KW_CHECK_DIR/kw_result.json |wc -l`
echo "    KW:Critical,Error(Total: $KW_ISSUES_CNT)" > $KW_CHECK_DIR/kw_check_report.txt
echo "    " >> $KW_CHECK_DIR/kw_check_report.txt
cat $KW_CHECK_DIR/kw_result.json >>  $KW_CHECK_DIR/kw_check_report.txt
echo "KW Check end==========="
