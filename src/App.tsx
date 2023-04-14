import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/atoms/button";
import Item from "../components/molecules/item";
import Wrapper from "../components/atoms/wrapper";
import Input from "../components/atoms/input";
import Select from "../components/atoms/select";
import { Educations, PastCareers } from "./types";

function App() {
  const [pastCareers, setPastCareers] = useState<PastCareers[]>([]);
  const [toBeDeletedPastCareers, setToBeDeletedPastCareers] = useState<
    number[]
  >([]);
  const [educations, setEducations] = useState<Educations[]>([]);
  const [toBeDeletedEducations, setToBeDeletedEducations] = useState<number[]>(
    []
  );

  useEffect(() => {
    fetchPastCareers();
    fetchEducations();
  }, []);

  const fetchPastCareers = () => {
    fetch("http://localhost:3001/past_career")
      .then((r) => r.json())
      .then((data: PastCareers[]) => {
        setPastCareers(data.sort((a, b) => a.order - b.order));
      });
  };

  const fetchEducations = () => {
    fetch("http://localhost:3001/education")
      .then((r) => r.json())
      .then((data: Educations[]) => {
        setEducations(data.sort((a, b) => a.order - b.order));
      });
  };

  const deletePastCareer = (itemId: number) => {
    setToBeDeletedPastCareers((p) => [...p, itemId]);
    setPastCareers((p) => p.filter((prevItem) => prevItem.id !== itemId));
  };

  const moveUpPastCareer = (index: number) => {
    const next = [...pastCareers];
    const element = next.splice(index, 1)[0];
    next.splice(index - 1, 0, element);

    setPastCareers(
      next.map((item, index) => {
        return {
          ...item,
          order: index,
        };
      })
    );
  };

  const moveDownPastCareer = (index: number) => {
    const next = [...pastCareers];
    const element = next.splice(index, 1)[0];
    next.splice(index + 1, 0, element);

    setPastCareers(
      next.map((item, index) => {
        return {
          ...item,
          order: index,
        };
      })
    );
  };

  const createNewPastCareer = () => {
    setPastCareers((p) => [
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
        order: pastCareers.length + 1,
        draft: true,
      },
    ]);
  };

  const handlePastCareerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    itemId: number,
    field: string
  ) => {
    setPastCareers((p) => {
      return p.map((prevItem) => {
        if (prevItem.id == itemId) {
          return {
            ...prevItem,
            [field]: e.target.value,
          };
        }

        return prevItem;
      });
    });
  };

  const deleteEducation = (itemId: number) => {
    setToBeDeletedEducations((p) => [...p, itemId]);
    setEducations((ed) => ed.filter((prevItem) => prevItem.id !== itemId));
  };

  const moveUpEducation = (index: number) => {
    const next = [...educations];
    const element = next.splice(index, 1)[0];
    next.splice(index - 1, 0, element);

    setEducations(
      next.map((item, index) => {
        return {
          ...item,
          order: index,
        };
      })
    );
  };

  const moveDownEducation = (index: number) => {
    const next = [...educations];
    const element = next.splice(index, 1)[0];
    next.splice(index + 1, 0, element);

    setEducations(
      next.map((item, index) => {
        return {
          ...item,
          order: index,
        };
      })
    );
  };

  const createNewEducation = () => {
    setEducations((ed) => [
      ...ed,
      {
        id: ed.length + 1,
        draft: true,
        edu_title: "",
        edu_class: "",
        edu_major: "",
        edu_start_date: "",
        edu_end_date: "",
        edu_degree: "",
        order: educations.length + 1,
      },
    ]);
  };

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    itemId: number,
    field: string
  ) => {
    setEducations((p) => {
      return p.map((prevItem) => {
        if (prevItem.id == itemId) {
          return {
            ...prevItem,
            [field]: e.target.value,
          };
        }

        return prevItem;
      });
    });
  };

  const fetchData = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    return response.json();
  };

  const submitData = async (url: string, method: string, data: any) => {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const handleDelete = async (items: number[], path: string) => {
    await Promise.all(
      items.map((id) =>
        fetchData(`http://localhost:3001/${path}/${id}`, { method: "DELETE" })
      )
    );
  };

  const handleDrafts = async (items: any[], path: string) => {
    await Promise.all(
      items
        .filter((item) => item.draft)
        .map((item) => {
          const { id, draft, ...rest } = item;
          return submitData(`http://localhost:3001/${path}`, "POST", rest);
        })
    );
  };

  const handleUpdates = async (items: any[], path: string) => {
    await Promise.all(
      items
        .filter((item) => !item.draft)
        .map((item) =>
          submitData(`http://localhost:3001/${path}/${item.id}`, "PATCH", item)
        )
    );
  };

  async function handleSave() {
    await handleDelete(toBeDeletedPastCareers, "past_career");
    await handleDrafts(pastCareers, "past_career");
    await handleUpdates(pastCareers, "past_career");

    await handleDelete(toBeDeletedEducations, "education");
    await handleDrafts(educations, "education");
    await handleUpdates(educations, "education");

    fetchPastCareers();
    fetchEducations();
  }

  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <div>
        <Button onClick={async () => handleSave()}>저장</Button>
      </div>

      <hr />

      <div>
        <h2>전 직장 경력</h2>
        <div>
          {pastCareers.map((item, index) => {
            return (
              <Item
                key={item.id}
                deleteItem={() => deletePastCareer(item.id)}
                moveUpItem={() => moveUpPastCareer(index)}
                moveDownItem={() => moveDownPastCareer(index)}
              >
                <div>
                  <Input
                    label="회사명"
                    type="text"
                    value={item.ca_title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handlePastCareerChange(e, item.id, "ca_title")
                    }
                  />
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Input
                      type="date"
                      value={item.ca_start_date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePastCareerChange(e, item.id, "ca_start_date")
                      }
                    />
                    <Input
                      type="date"
                      value={item.ca_end_date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePastCareerChange(e, item.id, "ca_end_date")
                      }
                    />
                  </div>
                  <Input
                    label="직급/직책"
                    type="text"
                    value={item.ca_rank}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePastCareerChange(e, item.id, "ca_rank")
                    }
                  />
                  <Select
                    label="고용형태"
                    value={item.ca_contract}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handlePastCareerChange(e, item.id, "ca_contract")
                    }
                  >
                    <Select.Option value="">선택</Select.Option>
                    <Select.Option value="FULL_TIME_1">정규직</Select.Option>
                    <Select.Option value="INTERN_1">계약직</Select.Option>
                    <Select.Option value="IRREGULAR_1">인턴</Select.Option>
                    <Select.Option value="PART_TIME_1">프리랜서</Select.Option>
                    <Select.Option value="FREELANCER_1">
                      아르바이트
                    </Select.Option>
                  </Select>
                  <Input
                    label="담당업무"
                    type="text"
                    value={item.ca_content}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePastCareerChange(e, item.id, "ca_content")
                    }
                  />
                </div>
              </Item>
            );
          })}
          <div>
            <Button onClick={() => createNewPastCareer()}>+ 추가하기</Button>
          </div>
        </div>

        <hr />

        <h2>학력사항</h2>
        <div>
          {educations.map((item, index) => {
            return (
              <Item
                key={item.id}
                deleteItem={() => deleteEducation(item.id)}
                moveUpItem={() => moveUpEducation(index)}
                moveDownItem={() => moveDownEducation(index)}
              >
                <div>
                  <Select
                    name="edu_class"
                    label="학교구분"
                    value={item.edu_class}
                    onChange={(e) =>
                      handleEducationChange(e, item.id, "edu_class")
                    }
                  >
                    <Select.Option>선택</Select.Option>
                    <Select.Option value="GRADUATESCHOOL">대학원</Select.Option>
                    <Select.Option value="UNIVERSITY">대학교</Select.Option>
                    <Select.Option value="COLLEGE">전문대</Select.Option>
                    <Select.Option value="HIGHSCHOOL">고등학교</Select.Option>
                  </Select>

                  <Input
                    label="학교명"
                    type="text"
                    value={item.edu_title}
                    name="edu_title"
                    onChange={(e) =>
                      handleEducationChange(e, item.id, "edu_title")
                    }
                  />
                  <div style={{ display: "flex" }}>
                    <Input
                      type="date"
                      name="edu_start_date"
                      value={item.edu_start_date}
                      onChange={(e) =>
                        handleEducationChange(e, item.id, "edu_start_date")
                      }
                    />
                    <Input
                      type="date"
                      name="edu_end_date"
                      value={item.edu_end_date}
                      onChange={(e) =>
                        handleEducationChange(e, item.id, "edu_end_date")
                      }
                    />
                  </div>
                  <Input
                    label="전공/계열"
                    type="text"
                    value={item.edu_major}
                    name="edu_major"
                    onChange={(e) =>
                      handleEducationChange(e, item.id, "edu_major")
                    }
                  />
                  <Select
                    name="edu_degree"
                    label="졸업구분"
                    value={item.edu_degree}
                    onChange={(e) =>
                      handleEducationChange(e, item.id, "edu_degree")
                    }
                  >
                    <Select.Option>선택</Select.Option>
                    <Select.Option value="GRADUATED">졸업</Select.Option>
                    <Select.Option value="PHD">박사</Select.Option>
                    <Select.Option value="MASTER">석사</Select.Option>
                    <Select.Option value="BACHELOR">학사</Select.Option>
                    <Select.Option value="ATTENDING">재학</Select.Option>
                    <Select.Option value="EXCHANGE">교환학생</Select.Option>
                    <Select.Option value="LEAVE">중단</Select.Option>
                    <Select.Option value="ABSENCE">휴학</Select.Option>
                  </Select>
                </div>
              </Item>
            );
          })}

          <div>
            <Button onClick={() => createNewEducation()}>+ 추가하기</Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
