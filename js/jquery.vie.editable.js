/*
 * jQuery VIE editable
 *
 */
var VieEditable = {
    options: {
        editor: false,
        stylesheet: false
	},

    editors: {
        wymeditor: {
            enableEditable: function(elem) {
                var containerInstance = VIE.ContainerManager.getInstanceForContainer(jQuery(elem));
			    containerInstance.editables = {};

                jQuery(elem).find('[property]').each(function() {
                
                    var containerProperty = jQuery(this);
				    var propertyName = containerProperty.attr('property');
				    if (containerProperty.is('div')) {
					    containerProperty.wymeditor({
						    html: containerProperty.html(),
						    postInit: function (wym) {
							    containerInstance.editables[propertyName] = wym;
							    wym.vieContainerInstance = containerInstance;
							}
				        });
				    }
			    });
            },
            disableEditable: function() {},
            isModified: function() {},
            getContents: function() {}
        },
        aloha: {
            enableEditable: function(elem) {},
            disableEditable: function() {},
            isModified: function() {},
            getContents: function() {}
        }
    },

	_create: function() {
	    this.editors[this.options.editor].enableEditable(this.element);
	},

	_destroy: function() {
		
	},

	_enable: function(test) {

	},

	_disable: function() {

	},

};

$.widget('vie.vieEditable', VieEditable);
