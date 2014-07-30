var _ = require( 'lodash' );
require( 'should' );

describe( 'hub-util', function () {
    var hutil = require('../lib/hub-util');

    describe( 'isValidHubFile', function () {
        var isValidHubFile = hutil.isValidHubFile;
        var EXPECTED_PROPS = [ 'absolutePath', 'relativePath', 'uniqueName' ];
        var VALID_FILE = { absolutePath: 'a', relativePath: 'r', uniqueName: 'r' };

        it( 'returns true if the file is a valid gulp-hub file', function () {
            isValidHubFile( VALID_FILE ).should.be.true;
        } );

        it( 'returns false if not a plain object', function () {
            var INVALID_TYPES = [ '', 0, 1, true, false, [], null, undefined ];
            INVALID_TYPES.forEach( function ( type ) {
                isValidHubFile( type ).should.be.false;
            } );
        } );

        it( 'returns false if missing properties', function () {
            EXPECTED_PROPS.forEach( function ( prop ) {
                var missingProp = _.omit( VALID_FILE, prop );
                isValidHubFile( missingProp ).should.be.false;
            } );
        } );

        it( 'returns false if properties are not strings', function () {
            var INVALID_TYPES = [ 0, 1, true, false, [], {}, null, undefined ];
            INVALID_TYPES.forEach( function ( type ) {
                EXPECTED_PROPS.forEach( function ( prop ) {
                    var testFile = _.assign( {}, VALID_FILE );
                    testFile[ prop ] = type;
                    isValidHubFile( testFile ).should.be.false;
                } );
            } );
        } );

        it( 'returns false if uniqueName does not match the relativePath', function () {
            var testFile = _.assign( {}, VALID_FILE, { uniqueName: 'not-the-rel-path' } );
            isValidHubFile( testFile ).should.be.false;
        } );
    } );
} );