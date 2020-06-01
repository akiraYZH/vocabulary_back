define({ "api": [
  {
    "type": "Get",
    "url": "/api/admin/getList",
    "title": "获得管理者列表",
    "group": "Admin",
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
            "field": "account",
            "description": "<p>(可选：模糊)管理者账号</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_now",
            "description": "<p>(可选)当前页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num_in_page",
            "description": "<p>(可选)每页个数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"is_success\": true,\n        \"page_total\": 1,\n        \"page_now\": 1,\n        \"num_in_page\": 10,\n        \"list\": [\n            {\n                \"id\": 23,\n                \"account\": \"abc\",\n                \"password\": \"123456\",\n                \"role\": \"editor\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admin.js",
    "groupTitle": "Admin",
    "name": "GetApiAdminGetlist"
  },
  {
    "type": "Post",
    "url": "/api/admin/add",
    "title": "增加管理者",
    "group": "Admin",
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
            "field": "role",
            "description": "<p>管理者角色：admin， editor</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 1,\n    \"msg\": \"成功注册\",\n    \"data\": {\n        \"insertId\": 38\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admin.js",
    "groupTitle": "Admin",
    "name": "PostApiAdminAdd"
  },
  {
    "type": "Post",
    "url": "/api/admin/del",
    "title": "删除管理者",
    "group": "Admin",
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
          "content": "{\n    \"code\": 1,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admin.js",
    "groupTitle": "Admin",
    "name": "PostApiAdminDel"
  },
  {
    "type": "Post",
    "url": "/api/admin/getUserInfo",
    "title": "通过token获得用户信息",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "header",
            "optional": false,
            "field": "token",
            "description": "<p>&quot;bearer &quot;+token值</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": " {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"id\": 38,\n        \"account\": \"664753092\",\n        \"password\": \"zhihao8177\",\n        \"role\": \"editor\",\n        \"status\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admin.js",
    "groupTitle": "Admin",
    "name": "PostApiAdminGetuserinfo"
  },
  {
    "type": "Post",
    "url": "/api/admin/login",
    "title": "登陆",
    "group": "Admin",
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
          "content": " {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiNjY0NzUzMDkyIiwiaWF0IjoxNTg5OTQ0NDUzLCJleHAiOjE1ODk5NDgwNTN9.o14Nc-dR881PzhTVfcvGYi11E9HyuZcHw3WCtFwRp3A\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admin.js",
    "groupTitle": "Admin",
    "name": "PostApiAdminLogin"
  },
  {
    "type": "Post",
    "url": "/api/admin/update",
    "title": "修改管理者",
    "group": "Admin",
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
            "description": "<p>管理者账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Role",
            "description": "<p>管理者角色（admin， editor）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 1,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/admin.js",
    "groupTitle": "Admin",
    "name": "PostApiAdminUpdate"
  }
] });
