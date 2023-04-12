import { useEffect, useState } from "react";
import Button from "../components/button";
import Item from "../components/item";
import Wrapper from "../components/wrapper";
import Input from "../components/input";
import Select from "../components/select";
import Option from "../components/option";

interface PastCareers {
  id?: number;
  draft?: boolean;
  ca_title: string;
  ca_content: string;
  ca_rank: string;
  ca_contract: string;
  ca_start_date: string;
  ca_end_date: string;
  ca_date_type: string;
  order: number;
}

interface Educations {
  id?: number;
  draft?: boolean;
  edu_title: string;
  edu_class: string;
  edu_major: string;
  edu_start_date: string;
  edu_end_date: string;
  edu_degree: string;
  order: number;
}

function App() {
  const [pastCareer, setPastCareer] = useState<PastCareers[]>([]);
  const [toBeDeletedPastCareer, setToBeDeletedPastCareer] = useState<
    (number | undefined)[]
  >([]);
  const [education, setEducation] = useState<Educations[]>([]);
  const [toBeDeletedEducation, setToBeDeletedEducation] = useState<
    (number | undefined)[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:3001/past_career")
      .then((r) => r.json())
      .then((data: PastCareers[]) => {
        setPastCareer(data.sort((a, b) => a.order - b.order));
      });

    fetch("http://localhost:3001/education")
      .then((r) => r.json())
      .then((data: Educations[]) => {
        setEducation(data.sort((a, b) => a.order - b.order));
      });
  }, []);

  return (
    <Wrapper>
      <div>
        <Button
          onClick={async () => {
            await Promise.all(
              toBeDeletedPastCareer.map((id) => {
                return fetch(`http://localhost:3001/past_career/${id}`, {
                  method: "DELETE",
                });
              })
            );
            await Promise.all(
              pastCareer
                .filter((item) => item.draft)
                .map((item) => {
                  delete item.id;
                  delete item.draft;

                  return fetch("http://localhost:3001/past_career", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                  });
                })
            );
            await Promise.all(
              pastCareer
                .filter((item) => !item.draft)
                .map((item) => {
                  return fetch(`http://localhost:3001/past_career/${item.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify(item),
                  });
                })
            );

            await Promise.all(
              toBeDeletedEducation.map((id) => {
                return fetch(`http://localhost:3001/education/${id}`, {
                  method: "DELETE",
                });
              })
            );
            await Promise.all(
              education
                .filter((item) => item.draft)
                .map((item) => {
                  delete item.id;
                  delete item.draft;

                  return fetch("http://localhost:3001/education", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                  });
                })
            );
            await Promise.all(
              education
                .filter((item) => !item.draft)
                .map((item) => {
                  return fetch(`http://localhost:3001/education/${item.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify(item),
                  });
                })
            );

            await fetch("http://localhost:3001/education")
              .then((r) => r.json())
              .then((data: Educations[]) => {
                setEducation(data.sort((a, b) => a.order - b.order));
              });

            await fetch("http://localhost:3001/education")
              .then((r) => r.json())
              .then((data: Educations[]) => {
                setEducation(data.sort((a, b) => a.order - b.order));
              });
          }}
        >
          저장
        </Button>
      </div>

      <hr />

      <div>
        <h2>전 직장 경력</h2>
        <div>
          {pastCareer.map((item, index) => {
            return (
              <Item
                key={item.id}
                deleteItem={() => {
                  setToBeDeletedPastCareer((p) => [...p, item.id]);
                  setPastCareer((p) =>
                    p.filter((prevItem) => prevItem.id !== item.id)
                  );
                }}
                moveUpItem={() => {
                  const next = [...pastCareer];
                  const element = next.splice(index, 1)[0];
                  next.splice(index - 1, 0, element);

                  setPastCareer(
                    next.map((item, index) => {
                      return {
                        ...item,
                        order: index,
                      };
                    })
                  );
                }}
                moveDownItem={() => {
                  const next = [...pastCareer];
                  const element = next.splice(index, 1)[0];
                  next.splice(index + 1, 0, element);

                  setPastCareer(
                    next.map((item, index) => {
                      return {
                        ...item,
                        order: index,
                      };
                    })
                  );
                }}
              >
                <div>
                  <div>
                    <Input
                      label="회사명"
                      type="text"
                      value={item.ca_title}
                      onChange={(e) => {
                        setPastCareer((p) => {
                          return p.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                ca_title: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Input
                      type="date"
                      value={item.ca_start_date}
                      onChange={(e) => {
                        setPastCareer((p) => {
                          return p.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                ca_start_date: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                    <Input
                      type="date"
                      value={item.ca_end_date}
                      onChange={(e) => {
                        setPastCareer((p) => {
                          return p.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                ca_end_date: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      label="직급/직책"
                      type="text"
                      value={item.ca_rank}
                      onChange={(e) => {
                        setPastCareer((p) => {
                          return p.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                ca_rank: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      label="고용형태"
                      value={item.ca_contract}
                      onChange={(e: { target: { value: any } }) => {
                        setPastCareer((p) => {
                          return p.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                ca_contract: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    >
                      <Option value="">선택</Option>
                      <Option value="FULL_TIME_1">정규직</Option>
                      <Option value="INTERN_1">계약직</Option>
                      <Option value="IRREGULAR_1">인턴</Option>
                      <Option value="PART_TIME_1">프리랜서</Option>
                      <Option value="FREELANCER_1">아르바이트</Option>
                    </Select>
                  </div>
                  <div>
                    <Input
                      label="담당업무"
                      type="text"
                      value={item.ca_content}
                      onChange={(e) => {
                        setPastCareer((p) => {
                          return p.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                ca_content: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                  </div>
                </div>
              </Item>
            );
          })}

          <div>
            <Button
              onClick={() => {
                const order = pastCareer.length + 1;

                setPastCareer((p) => [
                  ...p,
                  {
                    id: p.length + 1,
                    ca_title: "",
                    ca_content: "",
                    ca_rank: "",
                    ca_contract: "",
                    ca_start_date: "",
                    ca_end_date: "",
                    ca_date_type: "",
                    order,
                    draft: true,
                  },
                ]);
              }}
            >
              + 추가하기
            </Button>
          </div>
        </div>

        <hr />

        <h2>학력사항</h2>
        <div>
          {education.map((item, index) => {
            return (
              <Item
                key={item.id}
                deleteItem={() => {
                  setToBeDeletedEducation((ed) => [...ed, item.id]);
                  setEducation((ed) =>
                    ed.filter((prevItem) => prevItem.id !== item.id)
                  );
                }}
                moveUpItem={() => {
                  const next = [...education];
                  const element = next.splice(index, 1)[0];
                  next.splice(index - 1, 0, element);

                  setEducation(
                    next.map((item, index) => {
                      return {
                        ...item,
                        order: index,
                      };
                    })
                  );
                }}
                moveDownItem={() => {
                  const next = [...education];
                  const element = next.splice(index, 1)[0];
                  next.splice(index + 1, 0, element);

                  setEducation(
                    next.map((item, index) => {
                      return {
                        ...item,
                        order: index,
                      };
                    })
                  );
                }}
              >
                <div>
                  <div>
                    <Select
                      name="edu_class"
                      label="학교구분"
                      value={item.edu_class}
                      onChange={(e) => {
                        setEducation((ed) => {
                          return ed.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                edu_title: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    >
                      <Option>선택</Option>
                      <Option value="GRADUATESCHOOL">대학원</Option>
                      <Option value="UNIVERSITY">대학교</Option>
                      <Option value="COLLEGE">전문대</Option>
                      <Option value="HIGHSCHOOL">고등학교</Option>
                    </Select>
                  </div>
                  <div>
                    <Input
                      label="학교명"
                      type="text"
                      value={item.edu_title}
                      name="edu_title"
                      onChange={(e) => {
                        setEducation((ed) => {
                          return ed.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                edu_title: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                    {/* <Input
                      label="학교명"
                      type="text"
                      name="edu_title"
                      value={item.edu_title}
                      onChange={(e) => {
                        setPastCareer((ed) => {
                          return ed.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                edu_title: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    /> */}
                  </div>
                  <div style={{ display: "flex" }}>
                    <Input
                      type="date"
                      name="edu_start_date"
                      value={item.edu_start_date}
                      onChange={(e) => {
                        setEducation((ed) => {
                          return ed.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                edu_start_date: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                    <Input
                      type="date"
                      name="edu_end_date"
                      value={item.edu_end_date}
                      onChange={(e) => {
                        setEducation((ed) => {
                          return ed.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                edu_end_date: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      label="전공/계열"
                      type="text"
                      value={item.edu_major}
                      name="edu_major"
                      onChange={(e) => {
                        setEducation((ed) => {
                          return ed.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                edu_major: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      name="edu_degree"
                      label="졸업구분"
                      value={item.edu_degree}
                      onChange={(e: { target: { value: any } }) => {
                        setEducation((ed) => {
                          return ed.map((prevItem) => {
                            if (prevItem.id == item.id) {
                              return {
                                ...prevItem,
                                edu_degree: e.target.value,
                              };
                            }

                            return prevItem;
                          });
                        });
                      }}
                    >
                      <Option>선택</Option>
                      <Option value="GRADUATED">졸업</Option>
                      <Option value="PHD">박사</Option>
                      <Option value="MASTER">석사</Option>
                      <Option value="BACHELOR">학사</Option>
                      <Option value="ATTENDING">재학</Option>
                      <Option value="EXCHANGE">교환학생</Option>
                      <Option value="LEAVE">중단</Option>
                      <Option value="ABSENCE">휴학</Option>
                    </Select>
                  </div>
                </div>
              </Item>
            );
          })}

          <div>
            <Button
              onClick={() => {
                const order = education.length + 1;

                setEducation((ed) => [
                  ...ed,
                  {
                    id: ed.length + 1,
                    edu_title: "",
                    edu_class: "",
                    edu_major: "",
                    edu_start_date: "",
                    edu_end_date: "",
                    edu_degree: "",
                    order,
                    draft: true,
                  },
                ]);
              }}
            >
              + 추가하기
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
