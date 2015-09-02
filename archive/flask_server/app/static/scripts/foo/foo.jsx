var foos = [];

var updateFooTable = function() {
    React.render(
        <FooTable data={foos} />,
        document.getElementById('foo-table')
    );
};

var updateFoos = function() {
    $.ajax({
        url: '/foo/fetch/',
        type: 'GET',
        dataType: 'json',
        success: function(resources) {
            foos = resources;
            updateFooTable();
        }
    });
};

var smallColumn = {
    width: '0px',
    textAlign: 'right'
};

var FooRow = React.createClass({
    deleteFoo: function(fooID) {
        alert('deleting' + fooID.toString());
        $.ajax({
            url: '/foo/' + fooID.toString(),
            type: 'DELETE',
            dataType: 'json',
            success: function(resource) {
                for (var i = 0; i < foos.length; i++) {
                    if (foos[i].id == resource.id) {
                        foos.splice(i, 1);
                        updateFooTable();
                        break;
                    }
                }
            }
        });
    },

    render: function() {
        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.number}</td>
                <td>{this.props.data.text}</td>
                <td>{this.props.data.boolean ? 'True' : 'False'}</td>
                <td>{this.props.data.date}</td>
                <td style={smallColumn}>
                    <button onClick="{this.deleteFoo.bind(this, this.props.data.id)}" className="btn btn-default btn-sm" >
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </td>
            </tr>
        );
    }
});

var FooTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.data.forEach(function(foo) {
            rows.push(<FooRow data={foo} />);
        });
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Number</th>
                        <th>Text</th>
                        <th>Boolean</th>
                        <th>Date</th>
                        <th style={smallColumn}></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

$(document).ready(function() {
    $("#form-foo").ajaxForm({
        url: '/foo/',
        type: 'POST',
        beforeSubmit: function() {
            var form = $(this);
            var inputs = form.find("input, select, button, textarea");
            inputs.prop("disabled", true);
            return true;
        },
        success: function(responseText) {
            var form = $(this);
            var inputs = form.find("input, select, button, textarea");
            inputs.prop("disabled", false);
            foos.push($.parseJSON(responseText));
            updateFooTable();
        }
    });

    updateFooTable();
    updateFoos();
});
