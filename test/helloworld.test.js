const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

//const HelloWorld = require('../compile');

const {bytecode,interface} = require('../compile');
const assert = require('assert');
//beforeEach(()=>{
//  web3.eth.getAccounts().then(fetchAccounts=>{
//    console.log(fetchAccounts);
//  });
//});
var helloworld;
var fetchAccounts;
beforeEach(async ()=>{
  fetchAccounts = await web3.eth.getAccounts();
    helloworld = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:['mark']}).send({from:fetchAccounts[0],gas:'1000000'});
    //console.log(fetchAccounts);

});

describe('HelloWorld',()=>{
  it('deploy contract',()=>{
    //console.log(helloworld);
    assert.ok(helloworld.options.address)
  });

  it('call static function',async ()=>{
    const message = await helloworld.methods.getName().call();
    assert.equal('mark',message);
  })

  it('call dyamic function',async ()=>{
    await helloworld.methods.changeName('hehe').send({from:fetchAccounts[0]});
    const message =  await helloworld.methods.getName().call();
    assert.equal('hehe',message);
  })

});
