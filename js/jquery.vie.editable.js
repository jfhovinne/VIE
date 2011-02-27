/*
 * jQuery VIE editable
 *
 */
var VieEditable = {
    options: {
        editor: false
    },

    editors: {
        wymeditor: {
            enableEditable: function(o) {
                var containerInstance = VIE.ContainerManager.getInstanceForContainer(jQuery(o.element));
                containerInstance.editables = {};

                jQuery(o.element).find('[property]').each(function() {
                
                    var containerProperty = jQuery(this);
                    var propertyName = containerProperty.attr('property');
                    
                    if (containerProperty.is('div')) {
                        containerProperty.wymeditor(jQuery.extend(o.options, {
                            html: containerProperty.html(),
                            postInit: function (wym) {
                                containerInstance.editables[propertyName] = wym;
                                wym.vieContainerInstance = containerInstance;
                            }
                        }));
                    }
                });
            },
            disableEditable: function() {},
            isModified: function() {},
            getContents: function() {}
        },
        aloha: {
            enableEditable: function(o) {},
            disableEditable: function() {},
            isModified: function() {},
            getContents: function() {}
        }
    },

    _create: function() {
        this.editors[this.options.editor].enableEditable(this);
    },

    _destroy: function() {
        
    },

    _enable: function(test) {

    },

    _disable: function() {

    },

};

$.widget('vie.vieEditable', VieEditable);
