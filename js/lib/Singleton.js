/**
 * Singleton Helper
 *
 * @copyright: (C) 2017 Kibble Games Inc. All Rights Reserved.
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com}
 * @version: 1.0.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
'use strict';

if (__private__ === undefined)
    var __private__ = new WeakMap();

class Singleton {
    constructor( thisClass ) {
        let instance = __private__.get( thisClass );

        if (instance !== undefined)
            return instance;

        __private__.set( thisClass, this );
        return this;
    }
    static hasInstance( thisClass ) {
        let instance = __private__.get( thisClass );
        return (instance !== undefined);
    }
    static instance( thisClass ) {
        return __private__.get( thisClass );
    }
}
