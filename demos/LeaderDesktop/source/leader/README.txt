����Ŀ����yoeman����

1. ��װnodejs
2. ����npm����
		npm config set proxy= http://�û���:����@proxynj.zte.com.cn:80
		npm config list  �鿴������Ϣ
		��װnpm����ʱ��ָ��taobaoԴ���ٶȿ�ܶࣻҲ���Գ���ʹ��cnpm
		npm install -g xxx --registry=https://registry.npm.taobao.org
		npm install --registry=https://registry.npm.taobao.org
3. ��װgit������git����git config --global http.proxy http://�û���:����@proxynj.zte.com.cn:80
		�鿴ϵͳ����  git config --system --list
		�鿴��ǰ�û����� git config --global --list
		�鿴��ǰ�ֿ����� git config --local --list
4. ��װbower��ʹ������npm install -g bower --registry=https://registry.npm.taobao.org
5. �༭ .bowerrc�ļ����޸������proxy
{
"directory": "bower_components"��
"proxy": "http://�û���:����@proxynj.zte.com.cn:80",
"https-proxy": "http://�û���:����@proxynj.zte.com.cn:80"
}
6. ʹ��npm install��װ������
7. ʹ��bower install��װ������

����ȫ����װ�꣬�Ϳ��Կ���������


�ڵ�ǰĿ¼�£���cmd������gulp serve������ɿ���serverģʽ�����Զ�������������Ĵ��룬ǰ̨���Զ�ˢ�¡�

gulp�����task������gulp�ļ����濴��������build��watch֮��ġ�

