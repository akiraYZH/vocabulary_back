define({ "api": [
  {
    "type": "Get",
    "url": "/api/admins/get",
    "title": "获得管理者列表",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>(可选：精准)管理者ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>(可选：模糊)按account或者email模糊搜索</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current",
            "description": "<p>(可选)当前页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>(可选)每页个数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"account\": \"akira\",\n            \"email\": \"664753092@qq.com\",\n            \"role\": {\n                \"id\": 1,\n                \"name\": \"admin\"\n            }\n        }\n    ],\n    \"pagging\": {\n        \"size\": 10,\n        \"current\": 1,\n        \"total\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "GetApiAdminsGet"
  },
  {
    "type": "Post",
    "url": "/api/admin/del",
    "title": "删除管理者",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>管理者ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminDel"
  },
  {
    "type": "Post",
    "url": "/api/admin/del",
    "title": "删除管理者",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>管理者ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminDel"
  },
  {
    "type": "Post",
    "url": "/api/admin/login",
    "title": "登陆",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>管理者账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>管理者密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"id\": 1,\n        \"account\": \"akira\",\n        \"email\": \"664753092@qq.com\",\n        \"role\": {\n            \"id\": 1,\n            \"name\": \"admin\",\n            \"permissions\": [\n                {\n                    \"name\": \"home\"\n                },\n                {\n                    \"name\": \"about\"\n                },\n                {\n                    \"name\": \"test\"\n                }\n            ]\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminLogin"
  },
  {
    "type": "Post",
    "url": "/api/admin/login-token",
    "title": "用token登陆",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Header",
            "optional": false,
            "field": "authentication",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"id\": 1,\n        \"account\": \"akira\",\n        \"email\": \"664753092@qq.com\",\n        \"role\": {\n            \"id\": 1,\n            \"name\": \"admin\",\n            \"permissions\": [\n                {\n                    \"name\": \"home\"\n                },\n                {\n                    \"name\": \"about\"\n                },\n                {\n                    \"name\": \"test\"\n                }\n            ]\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminLoginToken"
  },
  {
    "type": "Post",
    "url": "/api/admins/add",
    "title": "增加管理者",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>管理者账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>管理者密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>管理者邮箱</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 200,\n    \"msg\": \"成功注册\",\n    \"data\": {\n        \"insertId\": 38\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminsAdd"
  },
  {
    "type": "Post",
    "url": "/api/admins/check-account",
    "title": "检查账户是否已经存在",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>管理者账号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "  {\n    \"code\": 200,\n    \"msg\": \"此账号可以使用\"\n}",
          "type": "json"
        },
        {
          "title": "失败返回",
          "content": "{\n    \"code\": 400,\n    \"msg\": \"此账号已被占用\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminsCheckAccount"
  },
  {
    "type": "Post",
    "url": "/api/admins/check-email",
    "title": "检查账户是否已经存在",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>管理者邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>要过滤的管理者id(可选)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "  {\n    \"code\": 200,\n    \"msg\": \"此邮箱可以使用\"\n}",
          "type": "json"
        },
        {
          "title": "失败返回",
          "content": "{\n    \"code\": 400,\n    \"msg\": \"此邮箱已被占用\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminsCheckEmail"
  },
  {
    "type": "Post",
    "url": "/api/admins/update",
    "title": "修改管理者",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>管理者ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>管理者密码()</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>管理者邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admins.js",
    "groupTitle": "Admins",
    "name": "PostApiAdminsUpdate"
  },
  {
    "type": "Delete",
    "url": "/api/books/del",
    "title": "删除管理者",
    "group": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>书本ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/books.js",
    "groupTitle": "Books",
    "name": "DeleteApiBooksDel"
  },
  {
    "type": "Get",
    "url": "/api/books/get",
    "title": "获得单词书列表",
    "group": "Books",
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "   {\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 2,\n            \"title\": \"基本词汇\",\n            \"count\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/books.js",
    "groupTitle": "Books",
    "name": "GetApiBooksGet"
  },
  {
    "type": "Get",
    "url": "/api/books/get-words",
    "title": "获得单词书含有和不含有的单词",
    "group": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>单词书ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"included\": [\n        {\n            \"id\": 2,\n            \"spelling\": \"bas\",\n            \"primary_explaination\": \"低的, 矮的；浅的\",\n            \"phonetic\": \"[bɑ, -s]\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        },\n        {\n            \"id\": 1,\n            \"spelling\": \"pomme\",\n            \"primary_explaination\": \"苹果\",\n            \"phonetic\": \"[pɔm]\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        }\n    ],\n    \"unincluded\": [\n        {\n            \"id\": 4,\n            \"spelling\": \"a\",\n            \"primary_explaination\": \"a\",\n            \"phonetic\": \"a\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        },\n        {\n            \"id\": 3,\n            \"spelling\": \"ab\",\n            \"primary_explaination\": \"\",\n            \"phonetic\": \"a\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        },\n        {\n            \"id\": 5,\n            \"spelling\": \"b\",\n            \"primary_explaination\": \"\",\n            \"phonetic\": \"b\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        },\n        {\n            \"id\": 7,\n            \"spelling\": \"bb\",\n            \"primary_explaination\": \"\",\n            \"phonetic\": \"b\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        },\n        {\n            \"id\": 8,\n            \"spelling\": \"c\",\n            \"primary_explaination\": \"\",\n            \"phonetic\": \"c\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        },\n        {\n            \"id\": 10,\n            \"spelling\": \"ccc\",\n            \"primary_explaination\": \"\",\n            \"phonetic\": \"c\",\n            \"difficulty\": 1,\n            \"image\": null,\n            \"audio\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/books.js",
    "groupTitle": "Books",
    "name": "GetApiBooksGetWords"
  },
  {
    "type": "Post",
    "url": "/api/books/add",
    "title": "增加单词书",
    "group": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>书名</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"insertId\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/books.js",
    "groupTitle": "Books",
    "name": "PostApiBooksAdd"
  },
  {
    "type": "Post",
    "url": "/api/books/distribute-words",
    "title": "为单词书增加单词",
    "group": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>单词书ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "toAdd",
            "description": "<p>要增加的单词id的数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "toRemove",
            "description": "<p>要去除的单词id的数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数实例",
          "content": "{\n\t\"id\":2,\n  \"toAdd\":[1,2],\n  \"toRemove\":[1,2],\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/books.js",
    "groupTitle": "Books",
    "name": "PostApiBooksDistributeWords"
  },
  {
    "type": "Put",
    "url": "/api/books/update",
    "title": "更改单词书名称",
    "group": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>单词书ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>单词书名（可选）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "   {\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/books.js",
    "groupTitle": "Books",
    "name": "PutApiBooksUpdate"
  },
  {
    "type": "Get",
    "url": "/api/roles/get",
    "title": "获得权限角色列表",
    "group": "Roles",
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "   {\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"name\": \"admin\",\n            \"router\": [\n                \"home\",\n                \"about\"\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/roles.js",
    "groupTitle": "Roles",
    "name": "GetApiRolesGet"
  },
  {
    "type": "Post",
    "url": "/api/roles/add",
    "title": "角色",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "permissions",
            "description": "<p>权限标识符数组</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"insertId\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/roles.js",
    "groupTitle": "Roles",
    "name": "PostApiRolesAdd"
  },
  {
    "type": "Put",
    "url": "/api/roles/update",
    "title": "获得权限角色列表",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名字（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "Arrary",
            "optional": false,
            "field": "permissions",
            "description": "<p>权限标识符数组（可选）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "   {\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/roles.js",
    "groupTitle": "Roles",
    "name": "PutApiRolesUpdate"
  },
  {
    "type": "Delete",
    "url": "/api/roles/del",
    "title": "删除角色",
    "group": "Rols",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>角色ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/roles.js",
    "groupTitle": "Rols",
    "name": "DeleteApiRolesDel"
  },
  {
    "type": "Delete",
    "url": "/api/types/del",
    "title": "删除词性",
    "group": "Types",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>词性ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/types.js",
    "groupTitle": "Types",
    "name": "DeleteApiTypesDel"
  },
  {
    "type": "Get",
    "url": "/api/types/get",
    "title": "获得词性列表",
    "group": "Types",
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "   {\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"type_abbr\": \"n.\",\n            \"type\": \"Nom\",\n            \"type_cn\": \"名词\"\n        },\n        {\n            \"id\": 2,\n            \"type_abbr\": \"n.m.\",\n            \"type\": \"Nom masculin\",\n            \"type_cn\": \"阳性名词\"\n        },\n        {\n            \"id\": 3,\n            \"type_abbr\": \"n.f.\",\n            \"type\": \"Nom féminin\",\n            \"type_cn\": \"阴性名词\"\n        },\n        {\n            \"id\": 4,\n            \"type_abbr\": \"v.\",\n            \"type\": \"Verbe\",\n            \"type_cn\": \"动词\"\n        },\n        {\n            \"id\": 5,\n            \"type_abbr\": \"v.t.\",\n            \"type\": \"Verbe transitif\",\n            \"type_cn\": \"及物动词\"\n        },\n        {\n            \"id\": 6,\n            \"type_abbr\": \"v.i.\",\n            \"type\": \"Verbe intransitif\",\n            \"type_cn\": \"不及物动词\"\n        },\n        {\n            \"id\": 7,\n            \"type_abbr\": \"adj.\",\n            \"type\": \"Adjectif\",\n            \"type_cn\": \"形容词\"\n        },\n        {\n            \"id\": 8,\n            \"type_abbr\": \"adv.\",\n            \"type\": \"Adverbe\",\n            \"type_cn\": \"副词\"\n        },\n        {\n            \"id\": 9,\n            \"type_abbr\": \"prép.\",\n            \"type\": \"Préposition\",\n            \"type_cn\": \"介词\"\n        },\n        {\n            \"id\": 10,\n            \"type_abbr\": \"pron.\",\n            \"type\": \"Pronom\",\n            \"type_cn\": \"代词\"\n        },\n        {\n            \"id\": 11,\n            \"type_abbr\": \"interj.\",\n            \"type\": \"Interjection\",\n            \"type_cn\": \"感叹词\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/types.js",
    "groupTitle": "Types",
    "name": "GetApiTypesGet"
  },
  {
    "type": "Post",
    "url": "/api/types/add",
    "title": "增加词性",
    "group": "Types",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_abbr",
            "description": "<p>词性缩写</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>词性全拼</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_cn",
            "description": "<p>词性中文</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"insertId\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/types.js",
    "groupTitle": "Types",
    "name": "PostApiTypesAdd"
  },
  {
    "type": "Put",
    "url": "/api/types/update",
    "title": "更改词性",
    "group": "Types",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_abbr",
            "description": "<p>词性缩写(可选)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>词性全拼（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_cn",
            "description": "<p>词性中文（可选）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "   {\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/types.js",
    "groupTitle": "Types",
    "name": "PutApiTypesUpdate"
  },
  {
    "type": "Get",
    "url": "/api/users/get",
    "title": "获得用户列表",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>(可选：精准)用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>(可选：模糊)按account或者email模糊搜索</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current",
            "description": "<p>(可选)当前页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>(可选)每页个数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"account\": \"akira\",\n            \"email\": \"664753092@qq.com\",\n            \"password\": \"123456\",\n            \"book\": null\n        }\n    ],\n    \"pagging\": {\n        \"size\": 10,\n        \"current\": 1,\n        \"total\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsersGet"
  },
  {
    "type": "Post",
    "url": "/api/user/login",
    "title": "登陆",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"id\": 1,\n        \"account\": \"akira\",\n        \"email\": \"664753092@qq.com\",\n        \"not_learned_arr\": null,\n        \"learned_arr\": null,\n        \"task_today\": null,\n        \"task_completed\": 0,\n        \"num_day\": 0,\n        \"last_login_time\": null,\n        \"book\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Users",
    "name": "PostApiUserLogin"
  },
  {
    "type": "Post",
    "url": "/api/users/add",
    "title": "增加用户",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>用户邮箱</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 200,\n    \"msg\": \"成功注册\",\n    \"data\": {\n        \"insertId\": 38\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsersAdd"
  },
  {
    "type": "Post",
    "url": "/api/users/check-email",
    "title": "检查账户是否已经存在",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>用户邮箱</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "  {\n    \"code\": 200,\n    \"msg\": \"此邮箱可以使用\"\n}",
          "type": "json"
        },
        {
          "title": "失败返回",
          "content": "{\n    \"code\": 400,\n    \"msg\": \"此邮箱已被占用\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsersCheckEmail"
  },
  {
    "type": "Post",
    "url": "/api/users/checkAccount",
    "title": "检查账户是否已经存在",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户账号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "  {\n    \"code\": 200,\n    \"msg\": \"此账号可以使用\"\n}",
          "type": "json"
        },
        {
          "title": "失败返回",
          "content": "{\n    \"code\": 400,\n    \"msg\": \"此账号已被占用\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsersCheckaccount"
  },
  {
    "type": "Post",
    "url": "/api/users/chooseBook",
    "title": "修改用户",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "book_id",
            "description": "<p>单词书id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsersChoosebook"
  },
  {
    "type": "Put",
    "url": "/api/users/update",
    "title": "修改用户",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码(可选)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>用户邮箱（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "not_learned_arr",
            "description": "<p>还没学习的单词数组（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "learned_arr",
            "description": "<p>已经学习的单词（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "task_completed",
            "description": "<p>每天任务：1:完成，0:未完成（可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num_day",
            "description": "<p>一天背诵个数可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "now_book",
            "description": "<p>单词书id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/users.js",
    "groupTitle": "Users",
    "name": "PutApiUsersUpdate"
  },
  {
    "type": "Delete",
    "url": "/api/words/del",
    "title": "删除单词",
    "group": "Words",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>单词ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/words.js",
    "groupTitle": "Words",
    "name": "DeleteApiWordsDel"
  },
  {
    "type": "Get",
    "url": "/api/words/get",
    "title": "获得单词列表",
    "group": "Words",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>(可选：精准)用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>难度：1为基础， 2为中级， 3为高级(可选)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "primary_type_id",
            "description": "<p>主要词性id(可选)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>(可选：模糊)按spelling或者explaination_cn模糊搜索</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "current",
            "description": "<p>(可选)当前页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>(可选)每页个数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "{{",
          "content": "{{\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 2,\n            \"spelling\": \"bas\",\n            \"spelling_m\": \"bas\",\n            \"spelling_f\": \"basse\",\n            \"phonetic\": \"[bɑ, -s]\",\n            \"image\": null,\n            \"audio\": null,\n            \"difficulty\": 1,\n            \"explainations\": [\n                {\n                    \"id\": 2,\n                    \"explaination_cn\": \"低的, 矮的；浅的\",\n                    \"sentence_fr\": \"Il marche la tête basse.\",\n                    \"sentence_cn\": \"他低着头走路。\",\n                    \"audio\": null,\n                    \"type\": {\n                        \"id\": 7,\n                        \"type_abbr\": \"adj.\",\n                        \"type\": \"Adjectif\",\n                        \"type_cn\": \"形容词\"\n                    }\n                }\n            ],\n            \"primary_type\": {\n                \"id\": 7,\n                \"type_abbr\": \"adj.\",\n                \"type\": \"Adjectif\",\n                \"type_cn\": \"形容词\"\n            }\n        },\n        {\n            \"id\": 1,\n            \"spelling\": \"pomme\",\n            \"spelling_m\": \"\",\n            \"spelling_f\": \"\",\n            \"phonetic\": \"[pɔm]\",\n            \"image\": null,\n            \"audio\": null,\n            \"difficulty\": 1,\n            \"explainations\": [\n                {\n                    \"id\": 1,\n                    \"explaination_cn\": \"苹果\",\n                    \"sentence_fr\": \"On coupe cette pomme en quatre quartiers.\",\n                    \"sentence_cn\": \"我们把苹果切成四份。\",\n                    \"audio\": null,\n                    \"type\": null\n                }\n            ],\n            \"primary_type\": {\n                \"id\": 3,\n                \"type_abbr\": \"n.f.\",\n                \"type\": \"Nom féminin\",\n                \"type_cn\": \"阴性名词\"\n            }\n        }\n    ],\n    \"pagging\": {\n        \"size\": 10,\n        \"current\": 1,\n        \"total\": 2\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/words.js",
    "groupTitle": "Words",
    "name": "GetApiWordsGet"
  },
  {
    "type": "Post",
    "url": "/api/words/add",
    "title": "增加单词",
    "group": "Words",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spelling",
            "description": "<p>单词</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spelling_m",
            "description": "<p>单词阳性拼写</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spelling_f",
            "description": "<p>单词阴性拼写</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phonetic",
            "description": "<p>单词音标</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "explainations",
            "description": "<p>单词解释数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>难度：1为基础， 2为中级， 3为高级</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "primary_type_id",
            "description": "<p>词性id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "primary_explaination",
            "description": "<p>主要含义</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数例子",
          "content": "  {\n\t\"spelling\":\"bas\",\n\t\"spelling_m\":\"bas\",\n\t\"spelling_f\":\"basse\",\n\t\"phonetic\":\"[bɑ, -s]\",\n\t\"difficulty\":1,\n\t\"primary_type_id\":7,\n\t\"primary_explaination\":\"低的, 矮的；浅的\",\n\t\"explainations\":[{\n\t\t\"type_id\":7,\n\t\t\"explaination_cn\":\"低的, 矮的；浅的\",\n\t\t\"sentence_fr\":\"Il marche la tête basse.\",\n\t\t\"sentence_cn\":\"他低着头走路。\",\n\t\t\"sort\":1\n\t}]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"insertId\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/words.js",
    "groupTitle": "Words",
    "name": "PostApiWordsAdd"
  },
  {
    "type": "Post",
    "url": "/api/words/img",
    "title": "改变单词url",
    "group": "Words",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>单词ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldImg",
            "description": "<p>旧单词图片</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "newImg",
            "description": "<p>新单词图片</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/words.js",
    "groupTitle": "Words",
    "name": "PostApiWordsImg"
  },
  {
    "type": "Post",
    "url": "/api/words/upload-img",
    "title": "上传图片",
    "group": "Words",
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 200,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/words.js",
    "groupTitle": "Words",
    "name": "PostApiWordsUploadImg"
  },
  {
    "type": "Put",
    "url": "/api/words/update",
    "title": "更改单词书名称",
    "group": "Words",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>单词ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spelling",
            "description": "<p>单词</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spelling_m",
            "description": "<p>单词阳性拼写</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spelling_f",
            "description": "<p>单词阴性拼写</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phonetic",
            "description": "<p>单词音标</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "explainations",
            "description": "<p>单词解释数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "difficulty",
            "description": "<p>难度：1为基础， 2为中级， 3为高级</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "primary_type_id",
            "description": "<p>词性id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "primary_explaination",
            "description": "<p>主要含义</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数例子",
          "content": "{\n  \"id\":2,\n  \"spelling\":\"bas\",\n  \"spelling_m\":\"bas\",\n  \"spelling_f\":\"basse\",\n  \"phonetic\":\"[bɑ, -s]\",\n  \"difficulty\":1,\n  \"primary_type_id\":7,\n  \"primary_explaination\":\"低的, 矮的；浅的\",\n  \"explainations\":[{\n    \"type_id\":7,\n    \"explaination_cn\":\"低的, 矮的；浅的\",\n    \"sentence_fr\":\"Il marche la tête basse.\",\n    \"sentence_cn\":\"他低着头走路。\",\n    \"sort\":1\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/words.js",
    "groupTitle": "Words",
    "name": "PutApiWordsUpdate"
  }
] });
