#  Trabalhar com o site do Show Tracker



## Localmente

Devido a limitações de segurança os navegadores não permitem a abertura de ficheiros remotos localmente sem os cabeçalhos adequados, que não podem ser adicionados por *javascript*. Para contronar esta limitação deve ser instalado o *addon* https://add0n.com/access-control.html.

Passa assim a ser possível aceder aos ficheiros *.json* que contêm a "base de dados" do *site*. Mesmo assim, as imagens cujo *url* é obtido através da BD não são carregados.



## No servidor

Ambas as restrições descritas anteriormente deixam de existir quando o *site* está online. Para este efeito foi criado o domínio https://ihc.gmatos.pt/

Para aceder ao servidor e editar os seus ficheiros, deve ser utilizada a seguinte conta FTP:

```
user: user@ihc.gmatos.pt
pass: #UHCua2020
```

Pode ser utilizada a aplicação https://filezilla-project.org/, podendo para facilitar a configuração do acesso ser importado o ficheiro `Ftp user@ihc.gmatos.pt.xml` (disponível na mesma pasta que este ficheiro), de acordo com as instruções disponíveis em https://www.amen.pt/assistencia/configuracao-automatica-ftp/ (a partir da terceira imagem, inclusive).