from string import Template
import os
import sys

def generate(name, page = 'no-page'):

    #Cambio el nombre a mayus
    mayusName = name.capitalize()

    #busco ruta base
    base_path = os.getcwd()

    """ SERVICIOS """

    #genero ruta del archivo service
    service_file_path = base_path + '/src/utils/' + name + '/services/' + name + '_services.js'

    #genero ruta para guardar el servicio
    service_path = base_path + '/src/utils/' + name + '/services/'

    #creo carpeta de servicio
    os.makedirs(service_path)

    """ CRUDS """

    #genero ruta del archivo crud
    crud_file_path = base_path + '/src/utils/' + name + '/cruds/' + name + '_cruds.js'

    #genero ruta para guardar el crud
    cruds_path = base_path + '/src/utils/' + name + '/cruds/'

    #creo carpeta de crud
    os.makedirs(cruds_path)

    """ PAGES """
    if page == 'with-page':
        #genero ruta del archivo page y style
        page_file_path = base_path + '/pages/dashboard/' + name + '/index.js'
        style_file_path = base_path + '/pages/dashboard/' + name + '/styles.module.scss'

        #genero ruta para guardar los archivos de page
        page_path = base_path + '/pages/dashboard/' + name

        #creo carpeta de pages con sus estilos
        os.makedirs(page_path)

    """ TEMPLATE GENERATOR """

    #creo el crud desde plantilla
    crud_template_file = open('automation/crud_template.txt')
    crud_template_file = Template(crud_template_file.read())
    crud_result = crud_template_file.substitute({"name": name,"mayusName":mayusName})
    generated_crud = open(crud_file_path, 'w')
    generated_crud.write(crud_result)
    generated_crud.close()

    #creo el servicio desde plantilla
    service_template_file = open('automation/service_template.txt')
    service_template_file = Template(service_template_file.read())
    service_result = service_template_file.substitute({"name": name,"mayusName":mayusName})
    service = open(service_file_path, 'w')
    service.write(service_result)
    service.close()

    if page == 'with-page':
        #creo la página desde plantilla
        page_template_file = open('automation/page_template.txt')
        page_template_file = Template(page_template_file.read())
        page_result = page_template_file.substitute({"name": name,"mayusName":mayusName})
        page = open(page_file_path, 'w')
        page.write(page_result)
        page.close()
        style = open(style_file_path,'x')
        style.close()



    #imprimo resultados y rutas
    print('Servicios y Cruds generados con éxtio para: ' + name)

if len(sys.argv) == 3 :
    generate(sys.argv[1],sys.argv[2])
else:
    generate(sys.argv[1])