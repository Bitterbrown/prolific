// Generated by CoffeeScript 1.6.3
var foo, instance, testfalse, testme, testnull;

instance = new prolific;

testme = testnull = testfalse = foo = null;

describe("Prolific", function() {
  it("should be a function", function() {
    return expect(typeof prolific).toBe("function");
  });
  describe("instance", function() {
    it("should be instantiated", function() {
      expect(instance).toBeDefined();
      return expect(typeof instance).toBe("object");
    });
    it("should have a test method", function() {
      expect(instance.test).toBeDefined();
      return expect(typeof instance.test).toBe("function");
    });
    return it("shoould not expose internal methods", function() {
      expect(instance.run_matcher).not.toBeDefined();
      return expect(instance.get_arguments).not.toBeDefined();
    });
  });
  describe("get attributes", function() {
    it("should have a method to get arguments from an assumption", function() {
      expect(instance.getArguments).toBeDefined();
      return expect(typeof instance.getArguments).toBe("function");
    });
    it("should catch a string", function() {
      var stringGetter;
      stringGetter = instance.getArguments("'this is my string'", "'asdasd'");
      return expect(stringGetter[0]).toBe("this is my string");
    });
    it("should catch a number", function() {
      var stringGetter;
      stringGetter = instance.getArguments("123", ".4");
      expect(stringGetter[0]).toBe(123);
      return expect(stringGetter[1]).toBe(.4);
    });
    it("should catch a math operation", function() {
      var stringGetter;
      stringGetter = instance.getArguments("(4/2*3+1)");
      return expect(stringGetter[0]).toBe(7);
    });
    it("should catch a variable", function() {
      var stringGetter;
      window.testVar = "test text";
      stringGetter = instance.getArguments("var testVar");
      return expect(stringGetter[0]).toBe("test text");
    });
    it("should catch an array", function() {
      var stringGetter;
      window.testVar = ["a", "b"];
      stringGetter = instance.getArguments("var testVar");
      return expect(stringGetter[0]).toEqual(["a", "b"]);
    });
    return it("should catch reserved types", function() {
      expect(void 0).toBe(instance.getArguments("undefined")[0]);
      expect(false).toBe(instance.getArguments("false")[0]);
      expect(true).toBe(instance.getArguments("true")[0]);
      return expect(null).toBe(instance.getArguments("null")[0]);
    });
  });
  describe("assumption matchers", function() {
    describe("matcher 'is greater|lower than'", function() {
      it("should catch 'a is greater than b' assumption", function() {
        var found;
        found = instance.finder("2 is greater than 1", instance.matchers);
        expect(found.item).toBe(instance.matchers["is greater|lower than"]);
        return expect(found.vars[0]).toBe("greater");
      });
      it("should catch 'a is lower than b' assumption", function() {
        var found;
        found = instance.finder("2 is lower than 4", instance.matchers);
        expect(found.item).toBe(instance.matchers["is greater|lower than"]);
        return expect(found.vars[0]).toBe("lower");
      });
      it("should catch 'a is > than b' assumption", function() {
        var found;
        found = instance.finder("2 is > than 4", instance.matchers);
        expect(found.item).toBe(instance.matchers["is greater|lower than"]);
        return expect(found.vars[0]).toBe(">");
      });
      it("should catch 'a is < than b' assumption", function() {
        var found;
        found = instance.finder("2 is < than 4", instance.matchers);
        expect(found.item).toBe(instance.matchers["is greater|lower than"]);
        return expect(found.vars[0]).toBe("<");
      });
      return it("should not catch 'a is bigger than b' assumption", function() {
        var found;
        found = instance.finder("2 is bigger than 4", instance.matchers);
        return expect(found.item).not.toBe(instance.matchers["is greater|lower than"]);
      });
    });
    describe("matcher 'is|isnt'", function() {
      it("should catch 'a is b' assumption", function() {
        var found;
        found = instance.finder("2 is 2", instance.matchers);
        expect(found.item).toBe(instance.matchers["is|isnt"]);
        return expect(found.vars[0]).toBe("is");
      });
      it("should catch 'a isnt b' assumption", function() {
        var found;
        found = instance.finder("2 isnt 2", instance.matchers);
        expect(found.item).toBe(instance.matchers["is|isnt"]);
        return expect(found.vars[0]).toBe("isnt");
      });
      return it("should not catch 'a equal to b' assumption", function() {
        var found;
        found = instance.finder("a equal to b", instance.matchers);
        return expect(found).not.toBeDefined();
      });
    });
    describe("matcher 'is|isnt an element'", function() {
      it("should catch 'a is an element' assumption", function() {
        var found;
        found = instance.finder("2 is an element", instance.matchers);
        expect(found.item).toBe(instance.matchers["is|isnt an element"]);
        return expect(found.vars[0]).toBe("is");
      });
      return it("should catch 'a isnt an element' assumption", function() {
        var found;
        found = instance.finder("2 isnt an element", instance.matchers);
        expect(found.item).toBe(instance.matchers["is|isnt an element"]);
        return expect(found.vars[0]).toBe("isnt");
      });
    });
    return describe("matcher 'is <query>'", function() {
      return it("should catch '$(query) is .classname' assumption", function() {
        var found;
        found = instance.finder("$('ciccio-pasticcio') is .ciccio-pasticcio", instance.matchers);
        return expect(found.vars[0]).toBe("is");
      });
    });
  });
  return describe("assume", function() {
    it("should expose an assume method", function() {
      return expect(assume).toBeDefined();
    });
    it("should be able to test 'is|isnt' assumptions", function() {
      assume("whenever is whenever");
      assume("3 is 3");
      assume("3 isnt '3'");
      assume("(4-1) is 3");
      assume("(3/2) is 1.5");
      assume("(4-2) isnt 3");
      assume("whenever isnt blabla");
      assume("true isnt 1");
      assume("true is true");
      assume("false isnt 0");
      assume("null isnt undefined");
      assume("var pippo is undefined");
      assume("var pippo isnt null");
      assume("var pippo isnt false");
      testme = "ciao";
      assume("var testme isnt undefined");
      assume("var testme isnt null");
      testnull = null;
      assume("var testnull isnt undefined");
      assume("var testnull is null");
      testfalse = false;
      assume("var testfalse isnt 0");
      assume("var testfalse is false");
      assume("var testfalse isnt true");
      assume("var testfalse isnt undefined");
      assume("var testfalse isnt null");
      $("body").append($('<div class="test" id="test"></div>'));
      assume("$('.test') is .test");
      assume("$('.test') is $('.test')");
      assume("$('.test') is #test");
      return assume("var $('.test').size() is 1");
    });
    it("should be able to test 'is|isnt an element' assumptions", function() {
      assume("$('.ciccio-pasticcio') isnt an element");
      $("body").append($('<div class="ciccio-pasticcio"></div>'));
      assume("$('.ciccio-pasticcio') is an element");
      assume("$('.ciccio-pasticcio') is .ciccio-pasticcio");
      assume("$('.ciccio-pasticcio') is :not(.asdad)");
      return assume("$('.ciccio-pasticcio') isnt .casdiccio-pasticcio");
    });
    it("should be able to test 'is greater|lower|>|<' assumptions", function() {
      assume("4 is greater than 3");
      assume("4 is greater than 3.999999999");
      assume("4 is lower than (5*2-6+.000001)");
      assume("(4-3) is > than .5");
      window.a = 5;
      assume("var a is < than 6");
      return assume("var a is lower than (5+1)");
    });
    it("should be able to test more than one condition with and", function() {
      assume("5 is greater than 4 and 'pippo' isnt 'pluto'");
      return assume("var a is 5 and $('.ciccio-pasticcio') is an element");
    });
    it("should wait given seconds before run the test", function() {
      window.a = 0;
      setTimeout(function() {
        return window.a = 1;
      }, 500);
      assume("in .51 seconds var a is 1");
      setTimeout(function() {
        return window.a = 2;
      }, 600);
      return assume("var a is 2 in 1 seconds");
    });
    return it("should be able to catch called method", function() {
      foo = {
        bar: function() {
          return alert("test");
        }
      };
      return assume("method foo.bar is called", function() {
        return foo.bar("test string");
      });
    });
  });
});
